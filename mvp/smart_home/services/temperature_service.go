package services

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

// TemperatureService handles fetching temperature data from external API
type TemperatureService struct {
	BaseURL    string
	HTTPClient *http.Client
}

// Структура с информацией о телеметрии устройства
type TelemetryResponse struct {
	DeviceId string                 `json:"deviceId"`
	Data     map[string]interface{} `json:"data"`
}

type TelemetryGetParams struct {
	Id []string `json:"id"`
}

// NewTemperatureService creates a new temperature service
func NewTemperatureService(baseURL string) *TemperatureService {
	return &TemperatureService{
		BaseURL: baseURL,
		HTTPClient: &http.Client{
			Timeout: 10 * time.Second,
		},
	}
}

// Обновление телеметрии по UUID устройства
func (s *TemperatureService) UpdateByDeviceId(id string) (*TelemetryResponse, error) {
	url := fmt.Sprintf("%s/get-telemetry/%s", s.BaseURL, id)

	resp, err := s.HTTPClient.Get(url)

	if err != nil {
		return nil, fmt.Errorf("во время получения телеметрии устройсва %s произошла ошибка %w", id, err)
	}

	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("некорректный статус ответа %d", resp.StatusCode)
	}

	var telemetryData TelemetryResponse

	if err := json.NewDecoder(resp.Body).Decode(&telemetryData); err != nil {
		return nil, fmt.Errorf("error decoding temperature response: %w", err)
	}

	return &telemetryData, nil
}

// Получение температуры по uuid устройств
func (s *TemperatureService) GetByDeviceIds(params TelemetryGetParams) (*[]TelemetryResponse, error) {
	url := fmt.Sprintf("%s/telemetry/last", s.BaseURL)

	jsonData, err := json.Marshal(params)

	if err != nil {
		return nil, fmt.Errorf("ошибка при формировании параметров %w", err)
	}

	resp, err := s.HTTPClient.Post(url, "application/json", bytes.NewBuffer(jsonData))

	if err != nil {
		return nil, fmt.Errorf("вовремя получения телеметрии устройств произошла ошибка: %w", err)
	}

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("некорректный статус ответа: %d", resp.StatusCode)
	}

	var telemetryData []TelemetryResponse

	if err := json.NewDecoder(resp.Body).Decode(&telemetryData); err != nil {
		return nil, fmt.Errorf("error decoding temperature response: %w", err)
	}

	return &telemetryData, nil
}
