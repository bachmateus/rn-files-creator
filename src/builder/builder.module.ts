import { filesManagerService } from "../manager/manager.module";
import { ComponentBuilderService } from "./service/component-builder.service";
import { ScreenBuilderService } from "./service/screen-builder.service";

export const componentBuilderService = new ComponentBuilderService(filesManagerService);
export const screenBuilderService = new ScreenBuilderService(filesManagerService);