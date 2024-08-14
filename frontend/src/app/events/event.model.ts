export interface Event {
  id?: number;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  cost: number;
  moreInfo: string;
  categories: string;
  labels: string;
  location: string;
  address: string;
  organizer: string;
  icon: string;
  limit: number;
}
