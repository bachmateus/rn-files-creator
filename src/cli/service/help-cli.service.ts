import { FilesManagerService } from '../../manager/service/files-manager.service';
import { txtHelpFile } from '../../manager/constants/paths';
import { HelpCliView } from '../view/help-cli-view';

export class HelpCliService {
  constructor(
    private filesManagerService: FilesManagerService,
    private helpCliView: HelpCliView
  ) {}

  async handle(): Promise<void> {
    const helpFileContent = await this.filesManagerService.readFile(txtHelpFile) as string;
    this.helpCliView.showHelpText(helpFileContent);
  }
}