<?php

namespace App\Entities;

use JsonSerializable;

class Quiz extends Entity implements JsonSerializable
{
    /**
     * Parse answers from the given question.
     *
     * @param  array $question
     * @return array
     */
    private function parseAnswersFromQuestion($question)
    {
        if (! isset($question['answers'])) {
            return [];
        }

        return collect($question['answers'])->map(function ($answer, $index) {
            $data = array_only($answer, ['title', 'awards', 'backgroundImage']);
            $data['id'] = (string) $index;

            return $data;
        });
    }

    /**
     * Parse out the questions from the json data.
     *
     * @return array
     */
    private function parseQuestionsFromJson()
    {
        // @TODO: Not sure why this was not named additionalContent like every other
        // instance where we use an additionalContent JSON field @_@
        $questions = $this->questions->get('items');
        if (! $questions) {
            return [];
        }

        return collect($questions)->map(function ($question, $index) {
            $data = array_only($question, ['title', 'backgroundImage']);
            $data['id'] = (string) $index;
            $data['answers'] = $this->parseAnswersFromQuestion($question);

            return $data;
        });
    }

    private function parseResultActionOptions()
    {
        return $this->questions->get('resultActions') ?: null;
    }

    /**
     * Parse and extract data for a result option.
     *
     * @param  Entity $result
     * @return mixed
     */
    private function parseResult($result)
    {
        switch ($result->getContentType()) {
            case 'linkAction':
                return new LinkAction($result->entry);
            case 'shareAction':
                return new ShareAction($result->entry);
            default:
                return null;
        }
    }

    /**
     * Parse and extract data for results options.
     *
     * @param  array $results
     * @return array
     */
    private function parseResults($results)
    {
        return collect($results)->map(function ($result) {
            return $this->parseResult($result);
        });
    }

    /**
     * Convert the object into something JSON serializable.
     *
     * @return array
     */
    public function jsonSerialize()
    {
        return [
            'id' => $this->entry->getId(),
            'type' => $this->getContentType(),
            'fields' => [
                'title' => $this->title,
                'subtitle' => $this->subtitle,
                'slug' => $this->slug,
                'introduction' => $this->introduction,
                'conclusion' => $this->conclusion,
                'comparison' => $this->comparison,
                'callToAction' => $this->callToAction,
                'questions' => $this->parseQuestionsFromJson(),
                'additionalContent' => $this->additionalContent,
                'results' => $this->parseResults($this->results),
                'resultActions' => $this->parseResultActionOptions(),
            ],
        ];
    }
}
