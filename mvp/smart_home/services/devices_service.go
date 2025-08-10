package services

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

// DevicesService handles fetching temperature data from external API
type DevicesService struct {
	BaseURL    string
	HTTPClient *http.Client
}

// DevicesResponse represents the response from the temperature API
type DeviceResponse struct {
	Id           float64   `json:"id"`
	Name         string    `json:"name"`
	SerialNumber string    `json:"serial_number"`
	Status       string    `json:"status"`
	CreatedAt    time.Time `json:"createdAt"`
	UpdatedAt    time.Time `json:"updatedAt"`
	Description  string    `json:"description"`
}

// NewDevicesService creates a new devices service
func NewDevicesService(baseURL string) *DevicesService {
	return &DevicesService{
		BaseURL: baseURL,
		HTTPClient: &http.Client{
			Timeout: 10 * time.Second,
		},
	}
}

// CreateDevice fetches temperature data for a specific location
func (s *DevicesService) CreateDevice(location string) (*TemperatureResponse, error) {
	url := fmt.Sprintf("%s/get-telemetry?location=%s", s.BaseURL, location)

	resp, err := s.HTTPClient.Get(url)
	if err != nil {
		return nil, fmt.Errorf("error fetching temperature data: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("unexpected status code: %d", resp.StatusCode)
	}

	var temperatureResp TemperatureResponse
	if err := json.NewDecoder(resp.Body).Decode(&temperatureResp); err != nil {
		return nil, fmt.Errorf("error decoding temperature response: %w", err)
	}

	return &temperatureResp, nil
}
