import z from 'zod';

const envSchema = z.object({
  LOGSEQ_BASE_URL: z
    .string()
    .url('Invalid Logseq base URL')
    .default('http://127.0.0.1:12315/api'),
  LOGSEQ_API_TOKEN: z.string().min(1, 'Logseq API token is required'),
});

export type Environment = z.infer<typeof envSchema>;

export function loadEnvironment(): Environment {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    const errors = result.error.format();
    console.error('❌ Configuration Error:');
    console.error('Required environment variables:');
    console.error('  - LOGSEQ_API_TOKEN: Logseq API token (required)');
    console.error(
      '  - LOGSEQ_BASE_URL: Logseq API base URL (optional, defaults to http://127.0.0.1:12315/api)'
    );
    console.error('\nDetailed errors:', errors);
    process.exit(1);
  }

  return result.data;
}
