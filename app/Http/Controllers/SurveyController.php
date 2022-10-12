<?php

namespace App\Http\Controllers;

use App\Models\Survey;
use App\Http\Requests\StoreSurveyRequest;
use App\Http\Requests\UpdateSurveyRequest;
use App\Http\Resources\SurveyResource;
use App\Models\SurveyQuestion;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule as ValidationRule;
use Illuminate\Support\Arr;

class SurveyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $user = $request->user();
        return SurveyResource::collection(Survey::where('user_id', $user->id)->paginate(6));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreSurveyRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreSurveyRequest $request)
    {
        //to create a record in database[in Survey table]
        $data = $request->validated();

        if (isset($data['image'])) {
            $relativePath = $this->saveImage($data['image']);
            $data['image'] = $relativePath;
        }


        $survey = Survey::create($data);

        //create new question
        foreach ($data['questions'] as $question) {
            $question['survey_id'] = $survey->id;

            //to create question in database
            $this->createQuestion($question);
        }
        return new SurveyResource($survey);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Survey  $survey
     * @return \Illuminate\Http\Response
     */
    public function show(Survey $survey, Request $request)
    {
        //Not every one have access the survey JUST the owner 
        //check if the owner ask for it or not
        $user = $request->user();
        if ($user->id !== $survey->user_id) {
            return abort(403, 'Unauthorized action.');
        }
        return new SurveyResource($survey);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateSurveyRequest  $request
     * @param  \App\Models\Survey  $survey
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateSurveyRequest $request, Survey $survey)
    {
        $data = $request->validated();

        if (isset($data['image'])) {
            $relativePath = $this->saveImage($data['image']);
            $data['image'] = $relativePath;

            if ($survey->image) {
                $absolutePath = public_path($survey->image);
                File::delete($absolutePath);
            }
        }

        //what if there is an old image ?


        $survey->update($data);

        //get existing ids for questions
        $existingID = $survey->questions()->pluck('id')->toArray();

        //get IDs for new array of questions
        $newIDs = Arr::pluck($data['questions'], 'id');

        //find the IDs that we need to delete 
        $toDelete = array_diff($existingID, $newIDs);

        //find the IDs that we need to add
        $toAdd = array_diff($newIDs, $existingID);

        //delete toDelete IDs
        SurveyQuestion::destroy($toDelete);

        //create new questions
        foreach ($data['questions'] as $question) {
            if (in_array($question['id'], $toAdd)) {
                $question['survey_id'] = $survey->id;
                $this->createQuestion($question);
            }
        }

        //update existing questions
        $questionsMap = collect($data['questions'])->keyBy('id');
        foreach ($survey->questions as $question) {
            if (isset($questionsMap[$question->id])) {
                $this->updateQuestion($question, $questionsMap[$question->id]);
            }
        }
        return new SurveyResource($survey);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Survey  $survey
     * @return \Illuminate\Http\Response
     */
    public function destroy(Survey $survey, Request $request)
    {
        $user = $request->user();
        if ($user->id !== $survey->user_id) {
            return abort(403, 'Unauthorized action.');
        }
        $survey->delete();
        if ($survey->image) {
            $absolutePath = public_path($survey->image);
            File::delete($absolutePath);
        }

        return response('', 204);
    }

    private function saveImage($image)
    {
        //check if the image base64
        if (preg_match('/^data:image\/(\w+);base64,/', $image, $type)) {
            // Take out the base64 encoded text without mime type 
            $image = substr($image, strpos($image, ',') + 1);
            // get file type 
            $type = strtolower($type[1]);
            if (!in_array($type, ['jpg', 'jpeg', 'gif', 'png'])) {
                throw new Exception('Invalid image type');
            }

            //check if there are any white spaces and replace them with '+'
            $image = str_replace(' ', '+', $image);

            //decode the image 
            $image = base64_decode($image);

            //another validation
            if ($image === false) {
                throw new Exception('base64_decode failed');
            }
        } else {
            throw new Exception('Did not match data URI with image data');
        }
        $dir = 'images/';

        //name the file
        $file = Str::random() . '.' . $type;

        /**
         * we need to get absolute path and relative path 
         * - absolute path -> to check if the directory exist or not 
         * - relative path -> to put content in it
         */
        $absolutePath = public_path($dir);
        $relativePath = $dir . $file;
        //check if the dir. exist or not
        if (!File::exists($absolutePath)) {
            //create the dir.
            File::makeDirectory($absolutePath, 0755, true);
        }

        //realtive or absolute path will work here
        file_put_contents($relativePath, $image);

        return $relativePath;
    }
    private function createQuestion($data)
    {
        //check if there are a data
        if (is_array($data['data'])) {
            // we need to convert it from array to JSON, because we can not store array in DB !
            $data['data'] = json_encode($data['data']);
        }

        //validate questions
        $validator = Validator::make($data, [
            'question' => 'required|string',
            'type' => ['required', ValidationRule::in([
                Survey::TYPE_TEXT,
                Survey::TYPE_TEXTAREA,
                Survey::TYPE_SELECT,
                Survey::TYPE_RADIO,
                Survey::TYPE_CHECKBOX,
            ])],
            'description' => 'nullable|string',
            'data' => 'present',
            'survey_id' => 'exists:App\Models\Survey,id'
        ]);
        return SurveyQuestion::create($validator->validated());
    }
    private function updateQuestion(SurveyQuestion $question, $data)
    {
        //check if there are a data
        if (is_array($data['data'])) {
            // we need to convert it from array to JSON, because we can not store array in DB !
            $data['data'] = json_encode($data['data']);
        }
        //validate questions
        $validator = Validator::make($data, [
            'id' => 'exists:App\Models\SurveyQuestion,id',
            'question' => 'required|string',
            'type' => ['required', ValidationRule::in([
                Survey::TYPE_TEXT,
                Survey::TYPE_TEXTAREA,
                Survey::TYPE_SELECT,
                Survey::TYPE_RADIO,
                Survey::TYPE_CHECKBOX,
            ])],
            'description' => 'nullable|string',
            'data' => 'present',
        ]);
        return $question->update($validator->validated());
    }
}
