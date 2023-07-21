export interface VersionDownloads {
    [version: string]: number;
}

export interface DownloadData {
    [date: string]: VersionDownloads;
}

export interface Project {
    name: string;
    downloads: DownloadData;
    versions: string[];
}