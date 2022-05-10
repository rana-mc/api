type GameVersion = {
  type: number;
  versions: string[];
};

type VersionType = {
  id: number;
  gameId: number;
  name: string;
  slug: string;
};

type Settings = {
  curseApiKey?: string;
};

type Server = ForgeServerData | FabricServerData;

type RanaDBData = {
  servers: Server[];
  settings: Settings;
};

type OutputHandler = (message: string) => void;

type BuildServerFunction = (data: CreateServerRequestData) => Promise<Server>;
type CreateServerRequestData = {
  id: string;
  name: string;
  gameVersionId: string;
  versionTypeId: number;
  coreType: string;
  installerVersion?: string;
  loaderVersion?: string;
  coreVersion?: string;
};