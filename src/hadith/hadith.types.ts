import { HadithStatus } from './hadith.enum';
import { Content, HadithContent } from './hadith.model';

export type HadithInput = {
  hadithId: string;
  content: Content;
  chains: string[];
  narratedBy: string;
  hadithContent: HadithContent;
  status: HadithStatus;
};
