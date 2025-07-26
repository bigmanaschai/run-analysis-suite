# Running Analysis Suite - Streamlit Application

A comprehensive web application for analyzing running performance with user authentication, video upload capabilities, and performance visualization.

## Features

### User Management
- **Three user types**: Admin, Coach, and Runner
- **Authentication system** with secure login
- **Role-based access control**:
  - **Admin**: Full access to all features, user management, and runner management
  - **Coach**: Can view and analyze their assigned runners' performance
  - **Runner**: Can upload videos and view their own performance reports

### Performance Analysis
- **Video Upload**: Support for 4 video files (one for each 25m segment of the 100m sprint)
- **Data Processing**: Extracts running performance metrics from videos (simulated with text file upload for demo)
- **Visualization**: Beautiful charts showing speed progression throughout the sprint
- **Excel Reports**: Downloadable performance reports with detailed metrics

### Design
- **Custom Theme**: Minimal design with specified color palette
  - Primary: rgb(255, 242, 224)
  - Secondary: rgb(192, 201, 238)
  - Accent: rgb(162, 170, 219)
  - Dark: rgb(137, 138, 196)
- **Font**: Google Fonts 'Prompt' for consistent typography

## Installation

1. Clone the repository:
```bash
git clone https://github.com/bigmanaschai/run-analysis-suite.git
cd run-analysis-suite
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

## Running the Application

1. Start the Streamlit app:
```bash
streamlit run app.py
```

2. Open your browser and navigate to:
```
http://localhost:8501
```

3. Default admin credentials:
   - Username: `admin`
   - Password: `admin123`

## Usage

### For Admins
1. Login with admin credentials
2. Navigate to "Manage Users" to create coach and runner accounts
3. Navigate to "Manage Runners" to assign runners to coaches
4. Upload and analyze performance data for any runner

### For Coaches
1. Login with coach credentials
2. View "My Runners" to see assigned athletes
3. Upload performance videos/data for your runners
4. View and download performance reports

### For Runners
1. Login with runner credentials
2. Upload your performance videos
3. View your performance analysis and download reports

## Data Format

The application expects performance data in the following format (for demo purposes):
```
mass A    t        x        v
0.000    0.863    0.033    0.067
0.100    0.133    0.816    8.857E-2
...
```

Where:
- `mass A`: Mass parameter
- `t`: Time increment
- `x`: Position
- `v`: Velocity (m/s)

## Database Schema

The application uses SQLite with the following tables:
- `users`: Stores user accounts and authentication
- `runners`: Stores runner information and coach assignments
- `performance_data`: Stores performance test results

## File Structure
```
run-analysis-suite/
├── app.py                 # Main Streamlit application
├── requirements.txt       # Python dependencies
├── README.md             # This file
└── running_analysis.db   # SQLite database (created on first run)
```

## Future Enhancements

1. **Deep Learning Integration**: Connect actual ML models for video analysis
2. **Real-time Processing**: Process videos in real-time to extract performance metrics
3. **Advanced Analytics**: Add more detailed biomechanical analysis
4. **Cloud Storage**: Store videos and reports in cloud storage
5. **API Integration**: Create REST API for mobile app integration

## Troubleshooting

1. **Database Issues**: Delete `running_analysis.db` to reset the database
2. **Login Problems**: Check console for error messages
3. **Upload Failures**: Ensure file formats match requirements

## Support

For issues or questions, please open an issue on the GitHub repository.