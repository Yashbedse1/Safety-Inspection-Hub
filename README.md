# Fire Safety Inspection Hub


A full-stack compliance dashboard for managing building fire safety inspection checklists. Built as a monorepo with a NestJS backend serving REST APIs and a Next.js frontend providing an intuitive interface for reviewing inspection data.


## Project Overview


This application provides a read-only dashboard for fire safety assessors and building managers to review and track safety inspection checklists across multiple buildings. The system handles various building types including offices, schools, hospitals, retail stores, and residential facilities.


**Key Features:**
- **Overview Dashboard**: Grid view of all checklists with status indicators, completion percentages, and pending actions
- **Detail View**: Expandable sections showing individual checklist items, responses, and action items
- **Advanced Filtering**: Search by building name/address, filter by status and completion level
- **Real-time Statistics**: Live counts and averages based on filtered results
- **CSV Export**: Download detailed checklist data for reporting
- **Responsive Design**: Works seamlessly on desktop and mobile devices


**Tech Stack:**
- **Backend**: NestJS 11, TypeScript, Swagger/OpenAPI
- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS, TanStack Query
- **Data**: Static JSON dataset (no database required)


## Architecture


This is a monorepo with clear separation between backend and frontend:


The backend serves data from a static JSON file and provides two main endpoints:
- `GET /api/checklists` - Returns summary data for all checklists
- `GET /api/checklists/:id` - Returns complete checklist with all sections and items


The frontend uses TanStack Query for efficient data fetching, caching, and background updates.


## Prerequisites


- **Node.js**: v18.17.0 or higher
- **npm**: v9.0.0 or higher
- **Git**: For cloning the repository


## Environment Variables


### Backend (.env in backend/ directory)
```bash
PORT=4000                    # API server port (default: 4000)
```


### Frontend (.env.local in frontend/ directory)
```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000  # Backend API URL
```


Copy the `.env.example` files in each directory and rename them to `.env` (backend) or `.env.local` (frontend), then adjust the values as needed.


## Setup Instructions


1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Safety-Inspection-Hub
   ```


2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```


3. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```


## Running the App


### Development Mode


1. **Start the backend server**
   ```bash
   cd backend
   npm run start:dev
   ```
   The API will be available at `http://localhost:4000`


2. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```
   The application will be available at `http://localhost:3000`


### Production Build


1. **Build the backend**
   ```bash
   cd backend
   npm run build
   npm run start:prod
   ```


2. **Build the frontend**
   ```bash
   cd frontend
   npm run build
   npm start
   ```


## Seeding Data


The backend serves data from a static JSON file located at `backend/data/checklists.json`. This file contains 12 sample checklists covering various building types and scenarios. No database setup or seeding is required - the data is loaded automatically when the server starts.


The JSON structure includes:
- Building information (name, address, occupancy, construction type)
- Assessment details (assessor, dates, responsible person)
- Sections (Fire Hazards, People at Risk, Evaluate and Act, etc.)
- Individual checklist items with responses (Yes/No/N/A)
- Action items for deficiencies requiring remediation


## Completion Percentage Policy


The application deliberately calculates completion percentages from actual item responses rather than using the precomputed `overallCompletionPercentage` field in the JSON data. This ensures accuracy and consistency.


**Calculation Formula:**
```
completion = round(100 * answered / total)
```
Where `answered` = items with responses of 'yes', 'no', or 'n/a', and `total` = all items in the checklist.


This approach prevents discrepancies between the displayed completion and the actual state of the checklist, which is crucial for compliance reporting.


## API Documentation


The backend includes comprehensive API documentation using Swagger/OpenAPI:


- **Swagger UI**: `http://localhost:4000/docs` - Interactive API documentation
- **OpenAPI JSON**: `http://localhost:4000/docs-json` - Raw OpenAPI specification


The documentation includes:
- Detailed request/response schemas
- Example values for all fields
- Error response formats (RFC7807 problem details)
- Interactive testing interface


## Assumptions & Trade-offs


### Assumptions Made
- **Read-only application**: No editing capabilities as per requirements
- **Static data**: JSON file serves as the data source (no database)
- **Single assessor per checklist**: Each checklist has one primary assessor
- **UK-based addresses**: Sample data uses UK address formats


### Deviations from Seed Data
- **Completion percentages**: Calculated dynamically instead of using JSON field values
- **Pending actions**: Counted from action item statuses rather than precomputed values
- **URL slugs**: Generated from building names for SEO-friendly URLs


### Future Improvements
With more development time, I would implement:
- **Database integration**: Replace JSON with PostgreSQL/MySQL
- **Authentication**: User roles and permissions
- **Real-time updates**: WebSocket integration for live data
- **Advanced filtering**: Date ranges, assessor filtering
- **Bulk operations**: Export multiple checklists
- **Audit logging**: Track who viewed what and when


## Testing Notes


The application handles various edge cases and error scenarios:


- **Loading states**: Skeleton loaders during data fetching
- **Error boundaries**: Graceful error display with retry options
- **Empty states**: Helpful messages when no data matches filters
- **Network errors**: Proper error handling for API failures
- **Invalid URLs**: 404 handling for non-existent checklists
- **CORS**: Properly configured for frontend-backend communication


The backend includes comprehensive error handling with RFC7807 problem details format for consistent error responses.


## Bonus Features Implemented


### Backend Enhancements
- **Swagger/OpenAPI documentation**: Complete API documentation with interactive testing
- **Problem Details (RFC7807)**: Standardized error response format
- **CORS configuration**: Proper cross-origin resource sharing setup
- **Global validation**: Input validation and transformation
- **TypeScript-first**: Strict typing throughout the codebase


### Frontend Enhancements
- **Advanced filtering**: Multi-criteria search and filtering system
- **Real-time statistics**: Live calculation of counts and averages
- **CSV export**: Download checklist data in spreadsheet format
- **Responsive design**: Mobile-first approach with Tailwind CSS
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support
- **Performance optimization**: React Query caching, debounced search
- **URL persistence**: Filter state saved in URL for sharing/bookmarking


### Developer Experience
- **Hot reload**: Both frontend and backend support live reloading
- **Type safety**: Full TypeScript coverage across the stack
- **Code organization**: Clean separation of concerns and modular architecture
- **Error handling**: Comprehensive error boundaries and fallbacks