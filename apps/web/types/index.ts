export type AppInfo = {
  name: string;
  chineseConceptName: string;
  tagline: string;
};

export type InformationConfidence = "confirmed" | "partial" | "uncertain";

export type ImageRole =
  | "artwork"
  | "wall_label"
  | "gallery_scene"
  | "detail"
  | "other";

export type AnalysisMode =
  | "default"
  | "wall_label"
  | "exhibition_space"
  | "architecture_design"
  | "quick_note"
  | "deep_review";

export type ExhibitionSession = {
  id: string;
  title: string;
  venue?: string;
  city?: string;
  visitDate?: Date;
  exhibitionType?: string;
  keywords: string[];
  overallImpression?: string;
  curatorialNotes?: string;
  spatialNotes?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ExhibitNote = {
  id: string;
  exhibitionSessionId: string;
  sequenceNumber: number;
  title?: string;
  artist?: string;
  yearOrPeriod?: string;
  mediumOrMaterial?: string;
  wallLabelText?: string;
  manualContext?: string;
  confirmedFacts?: string;
  visualObservations?: string;
  reasonableSpeculation?: string;
  viewingFocus?: string;
  aiAnalysis?: string;
  designInspiration?: string;
  oneSentenceSummary?: string;
  personalRemarks?: string;
  followUpQuestions: string[];
  informationConfidence: InformationConfidence;
  createdAt: Date;
  updatedAt: Date;
};

export type ExhibitImage = {
  id: string;
  exhibitNoteId: string;
  filePath: string;
  originalFilename?: string;
  mimeType?: string;
  width?: number;
  height?: number;
  imageRole: ImageRole;
  createdAt: Date;
};

export type CreateExhibitionSessionInput = {
  title: string;
  venue?: string;
  city?: string;
  visitDate?: Date | string;
  exhibitionType?: string;
  keywords?: string[];
  overallImpression?: string;
  curatorialNotes?: string;
  spatialNotes?: string;
};

export type UpdateExhibitionSessionInput =
  Partial<CreateExhibitionSessionInput>;

export type CreateExhibitNoteInput = {
  exhibitionSessionId: string;
  sequenceNumber?: number;
  title?: string;
  artist?: string;
  yearOrPeriod?: string;
  mediumOrMaterial?: string;
  wallLabelText?: string;
  manualContext?: string;
  confirmedFacts?: string;
  visualObservations?: string;
  reasonableSpeculation?: string;
  viewingFocus?: string;
  aiAnalysis?: string;
  designInspiration?: string;
  oneSentenceSummary?: string;
  personalRemarks?: string;
  followUpQuestions?: string[];
  informationConfidence?: InformationConfidence;
};

export type UpdateExhibitNoteInput = Partial<
  Omit<CreateExhibitNoteInput, "exhibitionSessionId" | "sequenceNumber">
>;

export type CreateExhibitImageInput = {
  exhibitNoteId: string;
  filePath: string;
  originalFilename?: string;
  mimeType?: string;
  width?: number;
  height?: number;
  imageRole?: ImageRole;
};

export type AnalyzeExhibitInput = {
  exhibitionSession: ExhibitionSession;
  exhibitNote: ExhibitNote;
  images?: ExhibitImage[];
  analysisMode: AnalysisMode;
};

export type AnalyzeExhibitResult = {
  confirmedFacts: string;
  visualObservations: string;
  reasonableSpeculation: string;
  viewingFocus: string;
  aiAnalysis: string;
  designInspiration: string;
  oneSentenceSummary: string;
  followUpQuestions: string[];
  informationConfidence: InformationConfidence;
};
