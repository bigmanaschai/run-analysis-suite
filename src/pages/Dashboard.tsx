import { useState } from "react";
import { Header } from "@/components/Layout/Header";
import { VideoUploadCard } from "@/components/VideoUpload/VideoUploadCard";
import { PerformanceChart } from "@/components/Dashboard/PerformanceChart";
import { StatsCard } from "@/components/Dashboard/StatsCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Timer, Zap, Target, TrendingUp, Download, FileSpreadsheet } from "lucide-react";

interface DashboardProps {
  userRole: 'admin' | 'coach' | 'runner';
  onLogout: () => void;
}

// Sample data based on the provided format
const samplePerformanceData = [
  { time: 0.000, position: 0.863, velocity: 0 },
  { time: 0.133, position: 0.816, velocity: 0.08857 },
  { time: 0.267, position: 0.863, velocity: 0.177 },
  { time: 0.400, position: 0.863, velocity: 0.08857 },
];

const videoRanges = [
  { range: "Range 1", distance: "0-25 meters", key: "0-25" },
  { range: "Range 2", distance: "25-50 meters", key: "25-50" },
  { range: "Range 3", distance: "50-75 meters", key: "50-75" },
  { range: "Range 4", distance: "75-100 meters", key: "75-100" },
];

export const Dashboard = ({ userRole, onLogout }: DashboardProps) => {
  const [uploadedVideos, setUploadedVideos] = useState<Record<string, boolean>>({});

  const handleVideoUpload = (range: string, file: File) => {
    console.log(`Uploading video for ${range}:`, file.name);
    setUploadedVideos(prev => ({ ...prev, [range]: true }));
  };

  const handleExportReport = () => {
    console.log("Exporting performance report to Excel");
    // This would trigger the Excel export functionality
  };

  const maxVelocity = Math.max(...samplePerformanceData.map(d => d.velocity));
  const avgVelocity = samplePerformanceData.reduce((sum, d) => sum + d.velocity, 0) / samplePerformanceData.length;
  const totalDistance = Math.max(...samplePerformanceData.map(d => d.position));

  return (
    <div className="min-h-screen bg-background font-prompt">
      <Header 
        userRole={userRole} 
        userName="John Doe" 
        onLogout={onLogout} 
      />
      
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            {userRole === 'admin' ? 'System Overview' : 
             userRole === 'coach' ? 'Athlete Performance' : 
             'My Running Performance'}
          </h2>
          <p className="text-muted-foreground">
            {userRole === 'admin' ? 'Manage all system data and users' :
             userRole === 'coach' ? 'Monitor and analyze your athletes' : 
             'Track your running progress and performance metrics'}
          </p>
        </div>

        <Tabs defaultValue="upload" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upload">Video Upload</TabsTrigger>
            <TabsTrigger value="analysis">Performance Analysis</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Video Upload for Analysis
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Upload videos for each range of the 100-meter track. Each camera captures 25 meters.
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {videoRanges.map((range) => (
                    <VideoUploadCard
                      key={range.key}
                      range={range.range}
                      distance={range.distance}
                      isUploaded={uploadedVideos[range.key] || false}
                      onUpload={(file) => handleVideoUpload(range.key, file)}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            {/* Performance Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatsCard
                title="Max Velocity"
                value={maxVelocity.toFixed(3)}
                unit="m/s"
                icon={Zap}
                description="Peak speed achieved"
              />
              <StatsCard
                title="Avg Velocity"
                value={avgVelocity.toFixed(3)}
                unit="m/s"
                icon={TrendingUp}
                description="Average speed"
              />
              <StatsCard
                title="Total Distance"
                value={totalDistance.toFixed(1)}
                unit="m"
                icon={Target}
                description="Distance covered"
              />
              <StatsCard
                title="Analysis Time"
                value="0.400"
                unit="s"
                icon={Timer}
                description="Total analysis duration"
              />
            </div>

            {/* Performance Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PerformanceChart
                data={samplePerformanceData}
                title="Position vs Time"
                type="line"
                dataKey="position"
              />
              <PerformanceChart
                data={samplePerformanceData}
                title="Velocity vs Time"
                type="bar"
                dataKey="velocity"
              />
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileSpreadsheet className="w-5 h-5" />
                  Performance Reports
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Generate and download detailed performance analysis reports.
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border border-border rounded-lg">
                    <h3 className="font-medium mb-2">Excel Performance Report</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Comprehensive analysis including position, velocity, and timing data for all ranges.
                    </p>
                    <Button onClick={handleExportReport} className="flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Export to Excel
                    </Button>
                  </div>
                  
                  {userRole === 'admin' && (
                    <div className="p-4 border border-border rounded-lg">
                      <h3 className="font-medium mb-2">System Analytics</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Overall system usage, user statistics, and performance trends.
                      </p>
                      <Button variant="outline" className="flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Export System Report
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};