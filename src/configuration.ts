import * as vs from 'vscode';

export interface TouchbarConfig {
  pullRebase: boolean;
  rubocop: boolean;
  push: boolean;
  correctRubocop: boolean;
  goToSpec: boolean;
  zenMode: boolean;
}

/**
 * Read the workspace configuration for 'rails.touchbar' and return a TouchbarConfig.
 * @return {TouchbarConfig} config object
 */
export const getConfig: () => TouchbarConfig = () => {
  const conf = vs.workspace.getConfiguration('rails.touchbar');

  return {
    pullRebase: conf.get('pullRebase', false),
    rubocop: conf.get('rubocop', true),
    push: conf.get('push', false),
    correctRubocop: conf.get('correctRubocop', true),
    goToSpec: conf.get('goToSpec', true),
    zenMode: conf.get('zenMode', true)
  };
};