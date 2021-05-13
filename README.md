# M3 - BookMeApp

<br>

## Description



This is a b2b application that works as a concert venues booking tool. There will be two users, venues and promoters and they will be able to create a user. The venue user will have a calendar where in which the promoter can choose a day and book gigs. Through the application a promoter will be able to check venue's details, book the venue, cancel reservation...At the same time, it's a tool for the venue to manage their availabilities and bookings. 



## User Stories

- **404:** As a user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault

- **Sign up:** As an user I can sign up in the platform

- **Login:** As a user I can login to the platform and go to my profile/dashboard.

- **Logout:** As a user I can logout from the platform so no one else can use it

- **Edit  profiles** As a user I can edit my profile.

- **View venues** As a user I can see the venue's list

- **Booking** as a user I can book venues and see my reservations in my dashboard

  


## Backlog

- Nodemailer for sign up and booking
- Different navbar depending on user
- Book on 2nd and 3rd option
- Admin user to validate profiles
- Styled-components / Material UI
- Add bands role
- Mapbox to locate venues 
- Recovery password functionality
- Responsive design
- Cloudinary to add files 
- Ask for budget


<br>


# Client / Frontend

## React Router Routes (React App)
| Path                       | Component           | Permissions                       | Behavior                                                     |
| -------------------------- | ------------------- | --------------------------------- | ------------------------------------------------------------ |
| `/`                        | SplashPage          | public `<Route>`                  | Home page                                                    |
| `/signup`                  | SignupPage          | promoter and venue  `<AnonRoute>` | Signup form, link to login, navigate to homepage after signup |
| `/login`                   | LoginPage           | promoter and venue`<AnonRoute>`   | Login form, link to signup, navigate to homepage after login |
| `/venues`                  | VenuesListPage      | promoter only `<PrivateRoute>`    | Shows all venues in a list                                   |
| `/venues/:id`              | VenueDetailPage     | promoter only `<PrivateRoute>`    | Details of a venue                                           |
| `/profile-venue/`          | ProfileVenuePage    | venue only `<PrivateRoute>`       | Profile venue details                                        |
| `/profile-venue/edit`      | ProfileVenuePage    | venue only `<PrivateRoute>`       | Edit venue profile                                           |
| `/profile-venue/delete`    | ProfileVenuePage    | venue only `<PrivateRoute>`       | Delete venue profile                                         |
| `/profile-promoter/`       | ProfilePromoterPage | promoter only `<PrivateRoute>`    | Profile promoter details                                     |
| `/profile-promoter/edit`   | ProfilePromoterPage | promoter only `<PrivateRoute>`    | Edit promoter details                                        |
| `/profile-promoter/delete` | ProfilePromoterPage | promoter only `<PrivateRoute>`    | Delete promoter profile                                      |




## Components

- HomePage
- Navbar
- LoginPage
- SignUpPage
- VenueListPage
- VenueDetailsPage
- VenueProfilePage
- PromoterProfilePage
- AnonRoute
- Calendar




## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.getUser() // synchronous
- Venue Service
  - venue.list()
  - venue.detail(id)
  - venue.edit(id)
  - venue.delete(id)
- Promoter Service 
  - promoter.detail(id)
  - promoter.edit(id)
  - promoter.delete(id)
- Booking Service
  - booking.add(id)
  - booking.delete(id)

<br>


# Server / Backend


## Models

Promoter model

```javascript
{
  name: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  address: {
            street: String,
            number: Number
            city: String,
            country: String
        }
 contactInfo: {
        tel: [Number],
        email: [String]
 }
  password: {type: String, required: true},
  CIF: {type: Number, required true}
  Bookings: [{type: Schema.Types.ObjectId, ref: 'Booking' }]
}
```



Venue model 

```
name: {type: String, required: true, unique: true},
email: {type: String, required: true, unique: true},
website: {type: String},
location: {
    type: {
      type: String, 
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
    }
  }
}),
 contactInfo: {
        tel: [Number],
        email: [String]
 }
  password: {type: String, required: true},
  CIF: {type: Number, required true},
  capacity: {type: Number, required true},
  rentingPrice: {type: Number, required true},
  image:{type: String, required: true},
  rider: {type: String, required: true},
  conditions: {type: String, required: true},
  license: {type: String, required: true},  
  merch: {type: Boolean},
  security: {type: Boolean},
  ticketOffice: {type: Boolean},
  merch: {type: boolean},
  production: {type: Boolean},
  technicians: {type: Boolean},
  genre: { type: String, enum: [ "All", "Metal/Rock/Punk/Alternative", "Blues/Rock", "HipHop/Rap", "Jazz", 		"R&B/Soul", "Latin", "Folk/Acoustic", "Electronic", "Experimental" ] },
  confirmed: {type:boolean, default: false},
   Bookings:  [{type: Schema.Types.ObjectId, ref: 'Booking'}
```



Show model

```javascript
{
  name: {type: String, required: true, unique: true},
  promoter: {type: Schema.Types.ObjectId, ref: 'Promoter' },
  venue: {type: Schema.Types.ObjectId, ref: 'Venue' },
  agentContact: {
      	name: [String],
        tel: [Number],
        email: [String]
 }
  date: Date,
  fee: {type: Number},
  capacity: {type: Number},
  time: {type: String}
 }
```



Booking model

```javascript
{
  promoter:  type: Schema.Types.ObjectId,
    ref: 'Promoter'
  venue: type: Schema.Types.ObjectId,
    ref: 'Venue'
   bookingDate : Date,
 }
```



## API Endpoints (backend routes)



|            |                                     |                                                              |                |              |                                              |
| ---------- | ----------------------------------- | ------------------------------------------------------------ | -------------- | ------------ | -------------------------------------------- |
| **Method** | **Route**                           | **Description**                                              | Success status | Error status | Request - Body                               |
| `GET`      | `/`                                 | Main page route.                                             |                |              |                                              |
| `GET`      | `/login`                            | Renders `login` form view.                                   |                |              |                                              |
| `POST`     | `/login`                            | Sends Login form data to the server.                         | 200            | 401          | { email, password }                          |
| `GET`      | `/signup`                           | Renders `signup` options.                                    | 201            | 404          |                                              |
| `GET`      | `/signup-promoter`                  | Renders `signup` form view for promoter.                     | 201            | 404          |                                              |
| `POST`     | `/signup-promoter`                  | Sends Sign Up info to the server and creates promoter user in the DB. | 201            | 404          | { email, password }                          |
| `GET`      | `/signup-venue`                     | Sign up page for venues.                                     | 201            | 404          |                                              |
| `POST`     | `/signup-venue`                     | Sends Sign Up info to the server and creates  venue user in the DB. | 201            | 404          | { email, password }                          |
| `GET`      | `/private/edit-promoterprofile`     | Private route. Shows`edit-promoter profile` form.            |                |              |                                              |
| `PUT`      | `/private/edit-promoterprofile`     | Private route. Sends edit-profile info to server and updates promoter user in DB. | 200            | 400          | { email, password, name, contact, CIF }      |
| `DELETE`   | ``/private/delete-promoterprofile`` | {id}                                                         | 201            | 400          | delete promoter                              |
| `GET`      | `/private/edit-venueprofile`        | Private route. Shows `edit-profile -owner` form.             |                |              |                                              |
| `PUT`      | `/private/edit-venueprofile`        | Private route. Sends edit-profile info to server and updates user in DB. | 200            | 400          | { email, password, name, contact, image... } |
| `DELETE`   | ``/private/delete-venueprofile``    | Delete venue                                                 | 201            | 400          | {id}                                         |
| `POST`     | `/private/logout`                   | Logs out the user                                            | 204            | 400          |                                              |
| `GET`      | `/venues`                           | Shows venue's view.                                          |                |              |                                              |
| `GET`      | `/venues/:id`                       | Shows particular venue's details.                            |                |              | {id}                                         |
| `POST`     | `/venues/:id`                       | Book venue. Add booking                                      | 200            | 404          | {id}                                         |

<br>


## Links

### Trello/Kanban

[Link to your trello board](https://trello.com/b/57oZWLon/project-m3) 

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/screeeen/project-client)

[Server repository Link](https://github.com/screeeen/project-server)

[Deployed App Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)
