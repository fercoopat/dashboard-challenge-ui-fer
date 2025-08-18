# Dashboard Challenge UI - Air Quality Monitoring

A modern, responsive, and dynamic dashboard for monitoring air quality data with real-time updates, interactive charts, and comprehensive data visualization.

## Features

### 🎯 **Summary Metrics**

- **Real-time metric cards** showing average, minimum, and maximum values
- **Dynamic updates** every second via API polling
- **Visual indicators** for value changes (increase/decrease)
- **Operator selection** (avg, min, max) with error handling

### 📊 **Interactive Charts**

- **Time series visualization** with multiple parameter support
- **Zoom functionality** with brush selection
- **Interval selection** (daily, monthly, yearly)
- **Parameter toggling** with color-coded legends
- **Responsive design** for all screen sizes

### 📋 **Historical Data Table**

- **Pagination** with local sorting and filtering
- **Column visibility controls** for better data focus
- **Search functionality** across all data fields
- **Sortable columns** with visual indicators
- **Modern table design** with alternating row colors

### 🔧 **Advanced Filtering**

- **Date range selection** with default range (March 1 - May 1, 2004)
- **Parameter selection** for focused analysis
- **Real-time data updates** based on filter changes
- **URL synchronization** for shareable dashboard states

## API Integration

The dashboard integrates with the following endpoints:

- **Summary Data**: `https://challenge-api.dofleini.com/air-quality/summary`
- **Range Data**: `https://challenge-api.dofleini.com/air-quality/range`
- **Timeline Data**: `https://challenge-api.dofleini.com/air-quality/timeline/{parameter}`

## Supported Parameters

| Key    | Label         | Description              |
| ------ | ------------- | ------------------------ |
| CO     | CO(GT)        | Carbon Monoxide          |
| PT08S1 | PT08.S1(CO)   | Tin Oxide                |
| NMHC   | NMHC(GT)      | Non-methane Hydrocarbons |
| C6H6   | C6H6(GT)      | Benzene                  |
| PT08S2 | PT08.S2(NMHC) | Titania                  |
| NOx    | NOx(GT)       | Nitrogen Oxides          |
| PT08S3 | PT08.S3(NOx)  | Tungsten Oxide           |
| NO2    | NO2(GT)       | Nitrogen Dioxide         |
| PT08S4 | PT08.S4(NO2)  | Tungsten Oxide           |
| PT08S5 | PT08.S5(O3)   | Indium Oxide             |
| T      | T             | Temperature              |
| RH     | RH            | Relative Humidity        |
| AH     | AH            | Absolute Humidity        |

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd dashboard-challenge-ui-fer

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Build for Production

```bash
pnpm build
pnpm preview
```

## Key Features Implementation

### Real-time Updates

- **1-second polling** for summary metrics
- **Change detection** with visual indicators
- **Error handling** with user-friendly notifications

### Responsive Design

- **Mobile-first approach** with Tailwind CSS
- **Flexible layouts** for all screen sizes
- **Touch-friendly controls** for mobile devices

### Performance Optimization

- **React Query caching** for efficient data management
- **Memoized calculations** for complex data transformations
- **Lazy loading** for chart components

### User Experience

- **Loading states** with skeleton components
- **Error boundaries** with helpful error messages
- **Toast notifications** for user feedback
- **Keyboard navigation** support

This project is part of the Dashboard Challenge UI implementation.
