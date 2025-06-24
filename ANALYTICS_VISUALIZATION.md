# Analytics Data Visualization

## 📊 Carbon Trend Graph

The analytics screen now displays a beautiful SVG line chart showing carbon emissions over time:

### Features:
- **Interactive Line Chart**: Shows monthly carbon trend data
- **Area Fill**: Gradient fill under the trend line for better visualization
- **Data Points**: Circular markers on each data point
- **Grid Lines**: Background grid for easier reading
- **Month Labels**: X-axis labels showing month abbreviations
- **Responsive**: Scales to fit the container

### Example Data Visualization:

```json
{
  "carbon_trend": [
    { "month": "Jan", "value": 17.72 },
    { "month": "Feb", "value": 18.54 },
    { "month": "Mar", "value": 18.73 },
    { "month": "Apr", "value": 19.3 },
    { "month": "May", "value": 17.57 },
    { "month": "Jun", "value": 19.32 }
  ]
}
```

**Visual Result**: A smooth green line chart showing the trend from January to June, with the lowest point in May (17.57 kg) and highest in June (19.32 kg).

## 📈 Summary Cards

### Daily Average Card:
- **Value**: 20.18 kg CO₂
- **Trend**: ↓ 7.74% vs yesterday (green, indicating decrease)
- **Color**: Green arrow down (good trend)

### Monthly Average Card:
- **Value**: 18.73 kg CO₂  
- **Trend**: ↑ 1.05% vs last month (red, indicating increase)
- **Color**: Red arrow up (concerning trend)

## 🏭 Emission Sources

Dynamic list showing real data from the API:

### 1. Vehicle Emissions
- **Icon**: 🚗 Car SVG icon
- **Value**: 708.41 kg CO₂
- **Trend**: ↓ 4.21% (green, decreasing)
- **Category**: "Car, Bus, Train"
- **Color**: Red background (highest emitter)

### 2. Electronics Emissions  
- **Icon**: 💡 Lightbulb SVG icon
- **Value**: 427.17 kg CO₂
- **Trend**: ↓ 6.31% (green, decreasing)
- **Category**: "Home, Office"
- **Color**: Yellow background (medium emitter)

### 3. Food Emissions
- **Icon**: 🍽️ Utensils SVG icon
- **Value**: 269.38 kg CO₂
- **Trend**: ↑ 0.1% (red, increasing)
- **Category**: "Household"
- **Color**: Blue background (lowest emitter)

## 🎨 Visual Design

### Color Coding:
- **Green**: Positive trends (decreasing emissions)
- **Red**: Negative trends (increasing emissions)
- **Emerald**: Primary brand color for charts
- **Gray**: Neutral elements and loading states

### Interactive Elements:
- **Loading States**: "Loading..." text while fetching data
- **Error Handling**: User-friendly error messages
- **Empty States**: "No data available" when API returns empty

### Chart Specifications:
- **SVG Dimensions**: 300x160 viewBox
- **Line Color**: #10b981 (emerald-500)
- **Fill Color**: rgba(16, 185, 129, 0.1) (emerald with opacity)
- **Grid Pattern**: Light gray (#f3f4f6)
- **Data Points**: 3px radius circles with white stroke

## 📱 Mobile Responsive

The visualization is optimized for mobile screens:
- **Container**: max-width 384px (sm breakpoint)
- **Chart Height**: 160px (10rem)
- **Touch-Friendly**: Large tap targets
- **Readable Text**: Minimum 12px font size

## 🔄 Real-Time Updates

The analytics screen automatically:
1. **Fetches Data**: On component mount
2. **Shows Loading**: While API call is in progress
3. **Updates UI**: When new data arrives
4. **Handles Errors**: With user-friendly messages
5. **Refreshes**: When user navigates back to screen

## 🧪 Example API Response Handling

```typescript
// The component handles this API response structure:
{
  "status": true,
  "message": "Dashboard data retrieved successfully", 
  "data": {
    "daily_average": {
      "value": 20.18,
      "percentage_change": 7.7415422127400255,
      "comparison_period": "vs yesterday",
      "is_increase": false
    },
    "monthly_average": {
      "value": 18.73,
      "percentage_change": 1.0454328203307457,
      "comparison_period": "vs last month", 
      "is_increase": true
    },
    "carbon_trend": [...],
    "emission_sources": [...]
  }
}
```

## ✨ User Experience

### Loading State:
```
📊 Analytics
┌─────────────────┐
│ Loading...      │
│ Loading...      │
└─────────────────┘
Loading trend data...
Loading emission sources...
```

### Loaded State:
```
📊 Analytics
┌─────────────────┐
│ Daily Avg  20.18│
│ ↓ 7.74% vs yes  │
│                 │
│ Monthly    18.73│
│ ↑ 1.05% vs mon  │
└─────────────────┘

Carbon Trend [Last 6 months ▼]
┌─────────────────┐
│    ╱╲           │
│   ╱  ╲    ╱╲    │
│  ╱    ╲  ╱  ╲   │
│ ╱      ╲╱    ╲  │
│Jan Feb Mar Apr May Jun│
└─────────────────┘

Emission Sources
🚗 Vehicle      708.41 kg ↓4.21%
💡 Electronics  427.17 kg ↓6.31%  
🍽️ Food         269.38 kg ↑0.1%
```

This creates a comprehensive, data-driven analytics experience that helps users understand their carbon footprint patterns and trends over time!
