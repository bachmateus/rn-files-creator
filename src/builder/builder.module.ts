import { filesManagerService } from "../manager/manager.module";
import { ComponentBuilderService } from "./service/component-builder.service";

export const componentBuilderService = new ComponentBuilderService(filesManagerService);