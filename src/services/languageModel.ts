import { Configuration, OpenAIApi } from 'openai'
import { Env } from '../utils/getEnv'

const configuration = new Configuration({
  apiKey: Env.OPEN_AI_KEY,
})

class LanguageModelService {
  private openai = new OpenAIApi(configuration)

  async createEmbedding(input: string): Promise<number[]> {
    const response = await this.openai.createEmbedding({
      model: 'text-similarity-ada-001',
      input,
    })

    return response.data.data[0].embedding
  }
}

export const languageModelService = new LanguageModelService()
