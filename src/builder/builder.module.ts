import { filesManagerService } from "../manager/manager.module";
import { ComponentBuilderService } from "./service/component-builder.service";
import { ScreenBuilderService } from "./service/screen-builder.service";
import { RouteBuilderService } from "./service/route-builder.service";

export const componentBuilderService = new ComponentBuilderService(filesManagerService);
export const screenBuilderService = new ScreenBuilderService(filesManagerService);
export const routeBuilderService = new RouteBuilderService(filesManagerService);