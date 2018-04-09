<?php

namespace App\Entities;

use JsonSerializable;

class Quiz extends Entity implements JsonSerializable
{
    /**
     * Parse choices to add ID based on index.
     *
     * @param  array $choices
     * @return array
     */
    private function parseChoices($choices)
    {
        return collect($choices)->map(function ($choice, $index) {
            $choice['id'] = (string) $index;

            return $choice;
        });
    }

    /**
     * Parse questions to add ID based on index and parse through choices.
     *
     * @param  array $questions
     * @return array
     */
    private function parseQuestions($questions)
    {
        return collect($questions)->map(function ($question, $index) {
            $question['id'] = (string) $index;
            $question['choices'] = $this->parseChoices($question['choices']);

            return $question;
        });
    }

    /**
     * Parse results to add an ABC based ID based on the index.
     *
     * @param  array $results
     * @return array
     */
    private function parseResults($results)
    {
        return collect($results)->map(function ($result, $index) {
            $resultId = chr($index+65);
            $result['id'] = $resultId;

            return $result;
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
                'results' => $this->parseResults($this->results),
                'questions' => $this->parseQuestions($this->questions),
                'resultBlocks' => $this->parseBlocks($this->resultBlocks),
                'additionalContent' => $this->additionalContent,
            ],
        ];
    }
}
