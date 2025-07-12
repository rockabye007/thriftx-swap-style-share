import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface GeminiRequest {
  prompt: string;
  type?: 'description' | 'categorize' | 'recommend';
}

export const useGeminiAI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateContent = async ({ prompt, type = 'description' }: GeminiRequest): Promise<string | null> => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: functionError } = await supabase.functions.invoke('gemini-ai', {
        body: { prompt, type }
      });

      if (functionError) {
        throw new Error(functionError.message);
      }

      return data?.result || null;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate content';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const generateDescription = (itemDetails: string) => 
    generateContent({ prompt: itemDetails, type: 'description' });

  const categorizeItem = (itemDetails: string) => 
    generateContent({ prompt: itemDetails, type: 'categorize' });

  const getRecommendations = (userPreferences: string) => 
    generateContent({ prompt: userPreferences, type: 'recommend' });

  return {
    generateContent,
    generateDescription,
    categorizeItem,
    getRecommendations,
    loading,
    error
  };
};