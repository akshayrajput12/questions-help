import { useState, useEffect } from 'react';
import { Question } from '../types/database';
import { getQuestions, createQuestion, updateQuestion, deleteQuestion } from '../lib/database';

export function useQuestions() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      setLoading(true);
      const data = await getQuestions();
      setQuestions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load questions');
    } finally {
      setLoading(false);
    }
  };

  const addQuestion = async (question: Omit<Question, 'id' | 'created_at' | 'user_id'>) => {
    try {
      const newQuestion = await createQuestion(question);
      setQuestions([newQuestion, ...questions]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create question');
      throw err;
    }
  };

  const editQuestion = async (id: string, updates: Partial<Question>) => {
    try {
      const updatedQuestion = await updateQuestion(id, updates);
      setQuestions(questions.map(q => q.id === id ? updatedQuestion : q));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update question');
      throw err;
    }
  };

  const removeQuestion = async (id: string) => {
    try {
      await deleteQuestion(id);
      setQuestions(questions.filter(q => q.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete question');
      throw err;
    }
  };

  return {
    questions,
    loading,
    error,
    addQuestion,
    editQuestion,
    removeQuestion,
    refreshQuestions: loadQuestions,
  };
}