import {Injectable} from '@angular/core';
import {Event} from './event.model';
import {environment} from "../../environments";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  events: Event[] = [
    {
      id: 1,
      title: 'Tech Conference 2023',
      description: 'Join industry leaders and tech enthusiasts at the Tech Conference 2023, where we will explore the latest advancements in technology. This event will feature keynote speeches, panel discussions, and hands-on workshops. Network with professionals and innovators from around the world and gain insights into the future of technology.',
      startDate: new Date('2023-05-01'),
      endDate: new Date('2023-05-03'),
      cost: 299,
      moreInfo: 'https://techconf2023.example.com',
      categories: 'Technology/Innovation',
      labels: 'Conference/Tech',
      location: 'Techville',
      address: 'Tech St, Innovation Hall, Techville',
      organizer: 'Tech Innovators Inc.',
      icon: 'devices',
      limit: 500
    },
    {
      id: 2,
      title: 'Art & Design Expo 2023',
      description: 'Discover the latest trends and innovations in art and design at the Art & Design Expo 2023. This event brings together artists, designers, and creatives from all over the world to showcase their work, exchange ideas, and participate in workshops. Whether you\'re an artist, a designer, or simply an enthusiast, this expo offers something for everyone.',
      startDate: new Date('2023-06-15'),
      endDate: new Date('2023-06-17'),
      cost: 150,
      moreInfo: 'https://artdesignexpo.example.com',
      categories: 'Art/Design',
      labels: 'Expo/Art/Design',
      location: 'Creativeland',
      address: 'Art St, Design Hall, Creativeland',
      organizer: 'Creative Minds',
      icon: 'palette',
      limit: 300
    },
    {
      id: 3,
      title: 'Health & Wellness Retreat 2023',
      description: 'Rejuvenate your mind, body, and soul at the Health & Wellness Retreat 2023. This retreat offers a variety of wellness activities including yoga, meditation, and health workshops. Learn from experts in the field and discover new ways to enhance your wellbeing. This retreat is the perfect escape to recharge and find inner peace.',
      startDate: new Date('2023-07-20'),
      endDate: new Date('2023-07-22'),
      cost: 200,
      moreInfo: 'https://healthwellnessretreat.example.com',
      categories: 'Health/Wellness',
      labels: 'Retreat/Health',
      location: 'Healthytown',
      address: 'Relaxation Rd, Spa Area, Healthytown',
      organizer: 'Wellness Co.',
      icon: 'spa',
      limit: 150
    },
    {
      id: 4,
      title: 'Business Leadership Summit 2023',
      description: 'The Business Leadership Summit 2023 is a premier event for business professionals and leaders. Attend keynote sessions with top executives, participate in leadership workshops, and engage in networking opportunities. This summit is designed to inspire and equip you with the tools needed to excel in your business endeavors.',
      startDate: new Date('2023-08-10'),
      endDate: new Date('2023-08-12'),
      cost: 350,
      moreInfo: 'https://businesssummit.example.com',
      categories: 'Business/Leadership',
      labels: 'Summit/Business',
      location: 'Businesscity',
      address: 'Business St, Boardroom Area, Businesscity',
      organizer: 'Business Leaders Association',
      icon: 'business_center',
      limit: 400
    },
    {
      id: 5,
      title: 'Music Festival 2023',
      description: 'Experience a spectacular array of musical performances at the Music Festival 2023. Featuring artists from various genres, this festival promises non-stop entertainment and fun. Enjoy live performances, food stalls, and interactive activities in a vibrant atmosphere. This event is a must-attend for music lovers of all ages.',
      startDate: new Date('2023-09-05'),
      endDate: new Date('2023-09-07'),
      cost: 100,
      moreInfo: 'https://musicfestival2023.example.com',
      categories: 'Music/Festival',
      labels: 'Festival/Music',
      location: 'Musicville',
      address: 'Music St, Stage Area, Musicville',
      organizer: 'Music Fest Inc.',
      icon: 'music_note',
      limit: 1000
    },
    {
      id: 6,
      title: 'Culinary Arts Workshop 2023',
      description: 'Join us for the Culinary Arts Workshop 2023, a two-day event where food enthusiasts can learn from master chefs. Participate in hands-on cooking sessions, discover new recipes, and enhance your culinary skills. This workshop is perfect for anyone looking to expand their knowledge and passion for the culinary arts.',
      startDate: new Date('2023-10-01'),
      endDate: new Date('2023-10-02'),
      cost: 250,
      moreInfo: 'https://culinaryworkshop.example.com',
      categories: 'Culinary/Workshop',
      labels: 'Workshop/Culinary',
      location: 'Foodland',
      address: 'Chef Ave, Kitchen Block, Foodland',
      organizer: 'Culinary Experts',
      icon: 'restaurant',
      limit: 100
    },
    {
      id: 7,
      title: 'Science Fair 2023',
      description: 'The Science Fair 2023 is a showcase of the latest scientific discoveries and innovations. Students, researchers, and enthusiasts come together to present their projects and experiments. This fair provides a platform for young scientists to share their work, gain feedback, and inspire others. Don\'t miss this opportunity to explore the wonders of science.',
      startDate: new Date('2023-11-10'),
      endDate: new Date('2023-11-12'),
      cost: 50,
      moreInfo: 'https://sciencefair2023.example.com',
      categories: 'Science/Education',
      labels: 'Fair/Science',
      location: 'Knowledgetown',
      address: 'Science St, Lab Hall, Knowledgetown',
      organizer: 'Science Association',
      icon: 'science',
      limit: 200
    },
    {
      id: 8,
      title: 'Literature Festival 2023',
      description: 'Celebrate the world of literature at the Literature Festival 2023. This event features readings, discussions, and book signings with renowned authors. Participate in writing workshops and explore the latest publications. Whether you\'re an avid reader or a budding writer, this festival offers a rich literary experience.',
      startDate: new Date('2023-12-01'),
      endDate: new Date('2023-12-03'),
      cost: 75,
      moreInfo: 'https://literaturefestival.example.com',
      categories: 'Literature/Festival',
      labels: 'Festival/Literature',
      location: 'Booktown',
      address: 'Main St, Library Hall, Booktown',
      organizer: 'Literary Society',
      icon: 'menu_book',
      limit: 250
    },
    {
      id: 9,
      title: 'Startup Pitch Event 2023',
      description: 'The Startup Pitch Event 2023 provides a platform for entrepreneurs to present their innovative ideas to potential investors and industry experts. This event includes pitch sessions, networking opportunities, and workshops on startup strategies. If you have a startup or an idea you want to bring to life, this event is for you.',
      startDate: new Date('2023-12-15'),
      endDate: new Date('2023-12-16'),
      cost: 0,
      moreInfo: 'https://startuppitch2023.example.com',
      categories: 'Business/Startup',
      labels: 'Pitch/Startup',
      location: 'Startuptown',
      address: 'Tech Park, Startuptown',
      organizer: 'Startup Incubator',
      icon: 'lightbulb',
      limit: 200
    },
    {
      id: 10,
      title: 'Environmental Summit 2023',
      description: 'The Environmental Summit 2023 brings together environmentalists, scientists, and policymakers to discuss pressing environmental issues. This summit includes keynote speeches, panel discussions, and workshops focused on sustainability and conservation. Join us to learn about the latest environmental research and initiatives, and contribute to the global effort to protect our planet.',
      startDate: new Date('2024-01-20'),
      endDate: new Date('2024-01-22'),
      cost: 175,
      moreInfo: 'https://environmentalsummit2023.example.com',
      categories: 'Environment/Sustainability',
      labels: 'Summit/Environment',
      location: 'Greentown',
      address: 'Eco Center Hall, Greentown',
      organizer: 'Green Earth Organization',
      icon: 'nature',
      limit: 300
    }
  ];

  constructor(private http: HttpClient,
              private snackBar: MatSnackBar,
              private router: Router) { }

  getEvents() {
    const url = `${environment.apiUrl}/events`;
    return this.http.get(url);
  }

  updateEvent(event: Event) {
    this.http.post(`${environment.apiUrl}/events/update`, event)
      .subscribe({
        next: (res: any) => {
          this.snackBar.open('Update successful!', 'Close', {
            duration: 5000
          });
        },
        error: (error) => {
          this.snackBar.open('Update failed!', 'Close', {
            duration: 5000
          });
          console.error('Update failed', error);
        }
      });
  }

  deleteEvent(eventId: any) {
    const id = { id: eventId };
    this.http.post(`${environment.apiUrl}/events/delete`, id)
      .subscribe({
        next: (res: any) => {
          this.snackBar.open('Delete successful!', 'Close', {
            duration: 5000
          });
        },
        error: (error) => {
          this.snackBar.open('Delete failed!', 'Close', {
            duration: 5000
          });
          console.error('Delete failed', error);
        }
      });
  }

  addEvent(event: Event) {
    this.http.post(`${environment.apiUrl}/events/create`, event)
      .subscribe({
        next: (res: any) => {
          this.snackBar.open('Event added successfully!', 'Close', {
            duration: 5000
          });
        },
        error: (error) => {
          this.snackBar.open('Event add failed!', 'Close', {
            duration: 5000
          });
          console.error('Event add failed', error);
        }
      });
  }

  getRow(labels: string): string {
    return labels ? labels.split('/').join(', ') : '';
  }

  getEventById(id: number) {
    const url = `${environment.apiUrl}/events/get?id=${id}`;
    return this.http.get(url);
  }
}
