import numpy as np
import pandas as pd
from datetime import datetime
import os


def generate_performance_data(range_type, base_speed, variation=0.5):
    """
    Generate sample performance data for a specific range

    Args:
        range_type: String indicating the range (e.g., '0-25', '25-50', etc.)
        base_speed: Base speed for this range in m/s
        variation: Speed variation amount
    """

    # Time points based on range
    if range_type == '0-25':
        time_start, time_end = 0, 3.5
        num_points = 35
    elif range_type == '25-50':
        time_start, time_end = 3.5, 6.5
        num_points = 30
    elif range_type == '50-75':
        time_start, time_end = 6.5, 9.0
        num_points = 25
    else:  # 75-100
        time_start, time_end = 9.0, 12.0
        num_points = 30

    # Generate time series
    time_points = np.linspace(time_start, time_end, num_points)

    # Generate realistic speed profile
    # Start slower, accelerate, then maintain/slightly decrease
    progress = (time_points - time_start) / (time_end - time_start)

    if range_type == '0-25':
        # Acceleration phase
        speed_profile = base_speed * (0.7 + 0.3 * progress) + np.random.normal(0, variation * 0.1, num_points)
    elif range_type in ['25-50', '50-75']:
        # Peak speed phase
        speed_profile = base_speed + np.random.normal(0, variation * 0.1, num_points)
    else:
        # Slight deceleration phase
        speed_profile = base_speed * (1 - 0.1 * progress) + np.random.normal(0, variation * 0.15, num_points)

    # Generate other parameters
    mass_A = 0.863 + np.random.normal(0, 0.05, num_points)
    t_values = np.diff(np.concatenate([[0], time_points]))
    x_values = np.cumsum(speed_profile * t_values[:len(speed_profile)])

    # Create data structure matching the sample format
    data = []
    for i in range(len(time_points)):
        data.append({
            'time': f"{time_points[i]:.3f}",
            'mass_A': f"{mass_A[i]:.3f}",
            't': f"{t_values[i] if i < len(t_values) else 0:.3f}",
            'x': f"{x_values[i]:.3f}",
            'v': f"{speed_profile[i]:.3f}"
        })

    return data


def save_performance_file(data, filename):
    """Save performance data to a text file in the required format"""

    with open(filename, 'w') as f:
        # Write header
        f.write("mass A\tt\tx\tv\n")

        # Write data
        for row in data:
            f.write(f"{row['mass_A']}\t{row['t']}\t{row['x']}\t{row['v']}\n")

    print(f"Created: {filename}")


def generate_test_dataset(runner_name, test_number):
    """Generate a complete test dataset for a runner"""

    # Create directory for test data
    dir_name = f"test_data_{runner_name}_{test_number}"
    os.makedirs(dir_name, exist_ok=True)

    # Speed profiles for different ranges (matching the image data)
    speed_profiles = {
        '0-25': 7.06,
        '25-50': 8.57,
        '50-75': 8.56,
        '75-100': 8.11
    }

    # Generate data for each range
    for range_type, base_speed in speed_profiles.items():
        data = generate_performance_data(range_type, base_speed)
        filename = os.path.join(dir_name, f"{runner_name}_{test_number}_{range_type}.txt")
        save_performance_file(data, filename)

    # Create a summary file
    summary_file = os.path.join(dir_name, "test_summary.txt")
    with open(summary_file, 'w') as f:
        f.write(f"Test Summary for {runner_name}\n")
        f.write(f"Test Number: {test_number}\n")
        f.write(f"Date: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
        f.write("\nSpeed Profiles:\n")
        for range_type, speed in speed_profiles.items():
            f.write(f"{range_type}m: {speed:.2f} m/s\n")

    print(f"\nTest dataset created in: {dir_name}")
    print("Files created:")
    for file in os.listdir(dir_name):
        print(f"  - {file}")


def create_multiple_tests():
    """Create multiple test datasets for demo purposes"""

    runners = ['T01', 'T02', 'T03']

    for runner in runners:
        for test_num in range(1, 3):  # 2 tests per runner
            generate_test_dataset(runner, test_num)
            print("\n" + "=" * 50 + "\n")


if __name__ == "__main__":
    print("Running Performance Data Generator")
    print("==================================\n")

    # Generate sample data for demo
    create_multiple_tests()

    print("\nDemo data generation complete!")
    print("You can now use these files to test the Streamlit application.")