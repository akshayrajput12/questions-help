import { supabase } from './supabase';
import type { Question, Profile } from '../types/database';

export const createQuestion = async (question: Omit<Question, 'id' | 'created_at' | 'user_id'>) => {
  const { data, error } = await supabase
    .from('questions')
    .insert([{ ...question, user_id: supabase.auth.getUser().then(({ data }) => data.user?.id) }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getQuestions = async () => {
  const { data, error } = await supabase
    .from('questions')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const updateQuestion = async (id: string, updates: Partial<Question>) => {
  const { data, error } = await supabase
    .from('questions')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteQuestion = async (id: string) => {
  const { error } = await supabase
    .from('questions')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

export const getProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) throw error;
  return data;
};

export const updateProfile = async (userId: string, updates: Partial<Profile>) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('user_id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
};