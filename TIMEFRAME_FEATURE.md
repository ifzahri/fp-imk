# 📊 Timeframe Selection Feature

## 🎯 Overview

The analytics screen now includes a dynamic timeframe dropdown that allows users to view carbon trend data across different time periods. The chart automatically updates to show the selected timeframe data.

## 🔧 Features

### **Timeframe Options:**
- **7 Days**: Shows daily data for the past week
- **1 Month**: Shows data for the past month  
- **3 Months**: Shows quarterly data
- **6 Months**: Shows semi-annual data (default)
- **1 Year**: Shows annual data

### **Interactive Dropdown:**
- ✅ Smooth dropdown animation
- ✅ Click outside to close
- ✅ Active selection highlighting
- ✅ Loading states during data fetch
- ✅ Responsive design

## 📈 API Integration

### **Endpoint Structure:**
```
GET /api/carbon/dashboard?timeframe={timeframe}
```

### **Timeframe Parameters:**
- `7_days` - Last 7 days
- `1_month` - Last 1 month  
- `3_months` - Last 3 months
- `6_months` - Last 6 months (default)
- `1_year` - Last 1 year

### **Response Structure:**
```json
{
  "status": true,
  "message": "Dashboard data retrieved successfully",
  "data": {
    "daily_average": { ... },
    "monthly_average": { ... },
    "carbon_trend": {
      "7_days": [
        { "label": "18 Jun", "value": 18.84 },
        { "label": "19 Jun", "value": 0 },
        { "label": "20 Jun", "value": 20.11 },
        { "label": "21 Jun", "value": 24.69 },
        { "label": "22 Jun", "value": 17.32 },
        { "label": "23 Jun", "value": 19.87 },
        { "label": "24 Jun", "value": 23.55 }
      ]
    },
    "emission_sources": [ ... ]
  }
}
```

## 🎨 Visual Examples

### **7 Days View:**
```
Carbon Trend [Last 7 days ▼]
┌─────────────────────────────────────┐
│     ●                         ●     │
│    ╱ ╲                       ╱ ╲    │
│   ╱   ●───●───●             ╱   ●   │
│  ╱           ╲ ╲           ╱        │
│ ●             ╲ ●─────────╱         │
│                ╲                    │
│18Jun 19Jun 20Jun 21Jun 22Jun 23Jun 24Jun│
└─────────────────────────────────────┘
```

### **1 Month View:**
```
Carbon Trend [Last 1 month ▼]
┌─────────────────────────────────────┐
│                                     │
│                ●                    │
│                                     │
│                                     │
│                                     │
│                                     │
│               Jun                   │
└─────────────────────────────────────┘
```

### **6 Months View (Default):**
```
Carbon Trend [Last 6 months ▼]
┌─────────────────────────────────────┐
│        ●                     ●      │
│       ╱ ╲                   ╱ ╲     │
│      ╱   ●───●             ╱   ╲    │
│     ╱         ╲           ╱     ╲   │
│    ●           ╲         ╱       ╲  │
│                 ╲       ╱         ● │
│                  ╲_____╱            │
│ Jan  Feb  Mar  Apr  May  Jun        │
└─────────────────────────────────────┘
```

## 🔄 User Interaction Flow

### **1. Initial Load:**
```typescript
// Default loads 6 months data
useEffect(() => {
  fetchDashboardData() // No timeframe = default
}, [])
```

### **2. Timeframe Selection:**
```typescript
// User clicks dropdown
setShowTimeframeDropdown(true)

// User selects "Last 7 days"
handleTimeframeChange("7_days")
  ↓
setTimeframe("7_days")
setTimeframeLabel("Last 7 days") 
setShowTimeframeDropdown(false)
fetchDashboardData("7_days") // API call with ?timeframe=7_days
```

### **3. Chart Update:**
```typescript
// New data received
dashboardData.carbon_trend["7_days"] = [...]
  ↓
// Chart re-renders with new data
const trendData = dashboardData?.carbon_trend?.[timeframe]
```

## 📱 Responsive Design

### **Mobile (< 384px):**
- Dropdown width: 140px minimum
- Font size: 12px for labels
- Touch-friendly tap targets (44px minimum)

### **Desktop:**
- Hover effects on dropdown items
- Smooth transitions
- Larger click areas

## 🎯 UX Enhancements

### **Loading States:**
```
Carbon Trend [Last 7 days ▼]
┌─────────────────────────────────────┐
│                                     │
│         Loading trend data...       │
│                                     │
└─────────────────────────────────────┘
```

### **Empty States:**
```
Carbon Trend [Last 1 year ▼]
┌─────────────────────────────────────┐
│                                     │
│   No trend data available for       │
│        last 1 year                  │
│                                     │
└─────────────────────────────────────┘
```

### **Error Handling:**
- Network errors show user-friendly messages
- Invalid timeframes fallback to default
- Retry mechanisms for failed requests

## 🔧 Technical Implementation

### **State Management:**
```typescript
const [timeframe, setTimeframe] = useState("6_months")
const [timeframeLabel, setTimeframeLabel] = useState("Last 6 months")
const [showTimeframeDropdown, setShowTimeframeDropdown] = useState(false)
const [isLoadingTrend, setIsLoadingTrend] = useState(false)
```

### **API Function:**
```typescript
export const getCarbonDashboard = async (queryParams?: string) => {
  const url = queryParams ? `/carbon/dashboard${queryParams}` : '/carbon/dashboard'
  const response = await api.get<APIResponse<CarbonDashboardResponse>>(url)
  return response.data
}
```

### **Type Definitions:**
```typescript
export interface CarbonDashboardResponse {
  daily_average: DailyAverageData;
  monthly_average: MonthlyAverageData;
  carbon_trend: {
    [key: string]: TrendData[]; // Dynamic timeframe keys
  };
  emission_sources: EmissionSource[];
}

export interface TrendData {
  label: string; // "18 Jun" or "Jan" depending on timeframe
  value: number;
}
```

## 🚀 Benefits

### **For Users:**
- **Flexible Analysis**: View data at different granularities
- **Better Insights**: Compare short-term vs long-term trends
- **Intuitive Interface**: Easy-to-use dropdown selection
- **Real-time Updates**: Instant chart updates

### **For Developers:**
- **Scalable Design**: Easy to add new timeframes
- **Clean API**: RESTful query parameter approach
- **Type Safety**: Full TypeScript support
- **Performance**: Only loads requested timeframe data

## 🎉 Usage Example

```typescript
// User wants to see last week's daily carbon emissions
1. Click "Last 6 months ▼" dropdown
2. Select "Last 7 days" from menu
3. Chart automatically updates to show:
   - 7 data points (one per day)
   - Date labels: "18 Jun", "19 Jun", etc.
   - Daily carbon values: 18.84, 0, 20.11, etc.
4. User can see daily patterns and zero-emission days
```

This feature provides users with powerful analytics capabilities to understand their carbon footprint patterns across different time horizons! 📊🌱
