import * as vs from 'vscode';

export interface TouchbarConfig {
  pullRebase: boolean;
  rubocop: boolean;
  push: boolean;
  correctRubocop: boolean;
  goToSpec: boolean;

}

/**
 * Read the workspace configuration for 'rails.touchbar' and return a TouchbarConfig.
 * @return {TouchbarConfig} config object
 */
export const getConfig: () => TouchbarConfig = () => {
  const conf = vs.workspace.getConfiguration('rails.touchbar');

  return {
    pullRebase: conf.get('pullRebase', true),
    rubocop: conf.get('rubocop', true),
    push: conf.get('push', true),
    correctRubocop: conf.get('correctRubocop', true),
    goToSpec: conf.get('goToSpec', true)

  };
};