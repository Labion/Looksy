# Data Model

## ExhibitionSession

Represents one exhibition visit.

Fields:

- id: string
- title: string
- venue: string optional
- city: string optional
- visitDate: date optional
- exhibitionType: string optional
- keywords: string[] optional
- overallImpression: string optional
- curatorialNotes: string optional
- spatialNotes: string optional
- createdAt: datetime
- updatedAt: datetime

## ExhibitNote

Represents one note for an artwork, installation, object, wall label, gallery scene, or detail.

Fields:

- id: string
- exhibitionSessionId: string
- sequenceNumber: number
- title: string optional
- artist: string optional
- yearOrPeriod: string optional
- mediumOrMaterial: string optional
- wallLabelText: string optional
- manualContext: string optional
- confirmedFacts: string optional
- visualObservations: string optional
- reasonableSpeculation: string optional
- viewingFocus: string optional
- aiAnalysis: string optional
- designInspiration: string optional
- oneSentenceSummary: string optional
- personalRemarks: string optional
- followUpQuestions: string[] optional
- informationConfidence: enum: confirmed | partial | uncertain
- createdAt: datetime
- updatedAt: datetime

## ExhibitImage

Fields:

- id: string
- exhibitNoteId: string
- filePath: string
- originalFilename: string optional
- mimeType: string optional
- width: number optional
- height: number optional
- imageRole: enum: artwork | wall_label | gallery_scene | detail | other
- createdAt: datetime

## AiRequestLog Optional

Only add if useful for debugging and cost tracking.

Fields:

- id: string
- exhibitNoteId: string optional
- provider: string
- model: string
- mode: string
- promptPreview: string optional
- responsePreview: string optional
- tokenUsage: json optional
- createdAt: datetime

## AnalysisMode

Suggested enum values:

- default
- wall_label
- exhibition_space
- architecture_design
- quick_note
- deep_review

## Markdown Export Shape

A session export should include:

- exhibition metadata
- overall impression
- spatial and curatorial notes
- all exhibit notes in sequence
- images as local links or placeholders
- design inspirations summary
- follow-up research list
