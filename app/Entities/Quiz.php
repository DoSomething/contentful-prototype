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
            $data = array_only($answer, ['title', 'award']);
            $data['id'] = $index;

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
        $questions = $this->questions->get('items');
        if (! $questions) {
            return [];
        }

        return collect($questions)->map(function ($question, $index) {
            $data = array_only($question, ['title', 'background']);
            $data['id'] = $index;
            $data['answers'] = $this->parseAnswersFromQuestion($question);

            return $data;
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
                'slug' => $this->slug,
                'introduction' => $this->introduction,
                'conclusion' => $this->conclusion,
                'questions' => $this->parseQuestionsFromJson(),
            ],
        ];
    }
}
