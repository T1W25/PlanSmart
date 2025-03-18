# Schema Relationships Overview
The `GuestSpeaker`, `Vendor`, and `TransportationProvider` schemas share a common structure and are interrelated through the `Portfolio` and `ClientReview` schemas.

## Portfolio Integration
- Each `GuestSpeaker`, `Vendor`, and `TransportationProvider` has a **Portfolio** field referencing the `PortfolioSchema`.  
- This allows them to showcase **past work, media, awards, and descriptions**.

## Client Reviews Association
- Each `GuestSpeaker`, `Vendor`, and `TransportationProvider` has an **array of Reviews** based on the `ClientReviewSchema`.  
- This enables multiple users to leave **feedback and ratings**.

## Shared Structure
- All three main entities (`GuestSpeaker`, `Vendor`, `TransportationProvider`) share the following fields:  
  - **Name**  
  - **Email**  
  - **Phone**  
  - **isVerified** status  
  - **Portfolio**  
  - **Reviews**  
- This structure promotes **reusability** and ensures a **standardized approach** across different entity types.

## See Schemas Highlighted Below

# GuestSpeaker Schema
Defines guest speakers with personal details, verification status, portfolio, and client reviews.

- **Name** (`String`, required) – Speaker's name.  
- **Email** (`String`, required, unique) – Contact email.  
- **Phone** (`String`, required) – Contact phone number.  
- **isVerified** (`Boolean`, default: `false`) – Verification status.  
- **Portfolio** (`PortfolioSchema`) – Speaker’s portfolio.  
- **Reviews** (`Array<ClientReviewSchema>`) – Client feedback.  

---

# ClientReview Schema
Stores client reviews for guest speakers, vendors, and transportation providers.

- **clientName** (`String`) – Reviewer's name.  
- **rating** (`Number`, min: `1`, max: `5`) – Star rating.  
- **reviewText** (`String`) – Review content.  
- **date** (`Date`, default: current timestamp) – Review date.  

---

# TransportationProvider Schema
Defines transportation providers with a similar structure as guest speakers.

- **Name** (`String`, required)  
- **Email** (`String`, required, unique)  
- **Phone** (`String`, required)  
- **isVerified** (`Boolean`, default: `false`)  
- **Portfolio** (`PortfolioSchema`)  
- **Reviews** (`Array<ClientReviewSchema>`)  

---

# Vendor Schema
Defines vendors with business details, portfolio, and reviews.

- **Name** (`String`, required)  
- **Email** (`String`, required, unique)  
- **Phone** (`String`, required)  
- **isVerified** (`Boolean`, default: `false`)  
- **Portfolio** (`PortfolioSchema`)  
- **Reviews** (`Array<ClientReviewSchema>`)  

---

# Portfolio Schema
Stores portfolio details for guest speakers, vendors, and transportation providers.

- **Type** (`String`) – Portfolio category.  
- **Description** (`String`) – Overview of work.  
- **PastWorkMedia** (`String`) – Media showcasing past work.  
- **Awards** (`String`) – Recognitions received.  

---