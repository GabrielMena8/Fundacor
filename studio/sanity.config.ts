import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { schemaTypes } from './schemas';

export default defineConfig({
  name: 'fundacor-studio',
  title: 'Fundacor Studio',
  projectId: 'ut4uykcs',
  dataset: 'production',
  plugins: [deskTool()],
  schema: { types: schemaTypes }
});
