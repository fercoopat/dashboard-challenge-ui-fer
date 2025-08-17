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

## Technology Stack

- **Frontend**: React 19 + TypeScript
- **UI Components**: Radix UI + Tailwind CSS
- **Charts**: Recharts with custom theming
- **State Management**: React Query for server state
- **Data Fetching**: Axios with error handling
- **Real-time Updates**: Polling with 1-second intervals

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

## Project Structure

```
src/modules/dashboard/
├── components/
│   ├── metric-cards.tsx          # Summary metric cards
│   ├── operator-selector.tsx     # Operator selection (avg/min/max)
│   ├── air-quality-chart.tsx     # Interactive time series chart
│   └── historical-data-table.tsx # Data table with pagination
├── hooks/
│   ├── use-dashboard.ts          # Main dashboard logic
│   └── use-range-filter.ts      # Date range management
├── services/
│   └── dashboard.service.ts      # API integration
├── constants/
│   └── dashboard.constants.ts    # Constants and enums
├── types/
│   └── dashboard.types.ts        # TypeScript interfaces
└── pages/
    └── dashboard.page.tsx        # Main dashboard page
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

## Customization

### Adding New Parameters

1. Update `VALUES_KEY_LABELS` in `dashboard.constants.ts`
2. Add new fields to `AirQualityData` interface
3. Update table columns in `historical-data-table.tsx`

### Modifying Chart Behavior

1. Edit `air-quality-chart.tsx` for chart-specific changes
2. Update chart configuration in `use-dashboard.ts`
3. Modify interval handling for different time granularities

### API Integration

1. Update endpoints in `dashboard.constants.ts`
2. Modify service methods in `dashboard.service.ts`
3. Adjust data transformation in the dashboard hook

## Browser Support

- **Modern browsers** with ES2020+ support
- **Chrome 90+**, **Firefox 88+**, **Safari 14+**
- **Mobile browsers** with touch support

## Contributing

1. Follow the existing code structure and patterns
2. Use TypeScript for all new code
3. Implement proper error handling
4. Add loading states for async operations
5. Test responsive behavior across devices

## License

This project is part of the Dashboard Challenge UI implementation.
