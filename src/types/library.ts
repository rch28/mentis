import type { MentalModel } from "@/data/modelsData";

export type LibraryItemType = "model" | "case";

export interface ModelBookmarkMeta {
  desc: string;
  origin: string;
  category: MentalModel["category"];
  difficulty: MentalModel["difficulty"];
}

export interface CaseBookmarkMeta {
  desc: string;
  origin: string;
  industry: string;
}

export type BookmarkMeta = ModelBookmarkMeta | CaseBookmarkMeta;

export interface Bookmark {
  id: string;
  item_id: string;
  item_type: LibraryItemType;
  item_title: string;
  item_meta: BookmarkMeta;
  created_at: string;
}

export type BookmarkInput =
  | {
      id: string;
      type: "model";
      title: string;
      meta?: ModelBookmarkMeta;
    }
  | {
      id: string;
      type: "case";
      title: string;
      meta?: CaseBookmarkMeta;
    };
