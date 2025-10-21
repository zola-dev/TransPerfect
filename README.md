## TransPerfect assignment

1. Clone the repository:

```bash
git clone https://github.com/zola-dev/TransPerfect.git
cd TransPerfect

Description

TransPerfect is a React (Class Components) user management and search application. This project demonstrates fetching, filtering, and displaying users from a public API, implementing basic table actions, and adding extra functionality for improved usability.

Task Requirements Completed

Data Fetching

Fetched users from JSONPlaceholder

Showed a loading spinner while fetching data

Stored data in the App component state

Data Display

Passed fetched data to the UserTable child component

Data Filtering

Created a Filter component for user input

Filtered data based on name or email

Table Actions

Delete user from the list

Edit user inline in the table

Extra / Bonus Features Implemented

Add Users functionality alongside Delete and Edit

Wildcard search option

Case-sensitive toggle for search

HttpClientService and UserService abstraction

For this demo, uses JSONPlaceholder mock API

Easily switchable to a real backend API

Frontend Structure: A Brief Overview

Main Component: App

Fetches the data

Holds state and passes it to child components

Enables filtering and table actions

Child Components

Filter: Handles search input

UserTable: Displays users in a table, supports Add/Edit/Delete

UserDetails (Optional): Shows detailed user info when a row is clicked

Service Organization

HttpClientService handles all HTTP requests

UserService manages user-related operations

Designed for reusability and easy extension

Data Management

Currently uses mock API (JSONPlaceholder)

Can switch to real backend API easily

Technologies Used

React (Class Components)

JavaScript (ES6)

CSS / Tailwind (if used)
