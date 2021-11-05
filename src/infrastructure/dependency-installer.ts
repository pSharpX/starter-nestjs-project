import { LabelRepository } from '../repositories/label.repository';

export class DependencyInstaller {
  public static Installers: Array<object> = [LabelRepository];
}
