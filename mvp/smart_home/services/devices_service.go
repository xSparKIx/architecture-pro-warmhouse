package services

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"smarthome/models"
	"time"
)

// DevicesService handles fetching temperature data from external API
type DevicesService struct {
	BaseURL    string
	HTTPClient *http.Client
}

// DevicesResponse represents the response from the temperature API
type DeviceResponse struct {
	Id           string    `json:"id"`
	Name         string    `json:"name"`
	Type         string    `json:"type"`
	SerialNumber string    `json:"serial_number"`
	Status       string    `json:"status"`
	CreatedAt    time.Time `json:"createdAt"`
	UpdatedAt    time.Time `json:"updatedAt"`
	Description  string    `json:"description"`
}

type DeviceUpdateResponse struct {
	Affected int `json:"affected"`
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

// Получение списка устройсв
func (s *DevicesService) GetDevices() (*[]DeviceResponse, error) {
	url := fmt.Sprintf("%s/devices", s.BaseURL)

	resp, err := s.HTTPClient.Get(url)

	if err != nil {
		return nil, fmt.Errorf("error fetching devices data: %w", err)
	}

	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("unexpected status code: %d", resp.StatusCode)
	}

	var devicesResponse []DeviceResponse

	if err := json.NewDecoder(resp.Body).Decode(&devicesResponse); err != nil {
		return nil, fmt.Errorf("error decoding devices response: %w", err)
	}

	return &devicesResponse, nil
}

// Получение устройства по uuid
func (s *DevicesService) GetDeviceById(id string) (*DeviceResponse, error) {
	url := fmt.Sprintf("%s/devices/%s", s.BaseURL, id)

	resp, err := s.HTTPClient.Get(url)

	if err != nil {
		return nil, fmt.Errorf("во время получения произошла ошибка: %w", err)
	}

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("некорректный статус ответа: %d", resp.StatusCode)
	}

	var deviceResponse DeviceResponse

	if err := json.NewDecoder(resp.Body).Decode(&deviceResponse); err != nil {
		return nil, fmt.Errorf("ошибка при декодировании ответа: %w", err)
	}

	return &deviceResponse, nil
}

// Метод создания устройства
func (s *DevicesService) Create(data models.SensorCreate) (*DeviceResponse, error) {
	url := fmt.Sprintf("%s/devices", s.BaseURL)

	jsonData, err := json.Marshal(data)

	if err != nil {
		return nil, fmt.Errorf("ошибка при преобразовании данных %w в формат JSON", err)
	}

	resp, err := s.HTTPClient.Post(url, "application/json", bytes.NewBuffer(jsonData))

	if err != nil {
		return nil, fmt.Errorf("error create device: %w", err)
	}

	defer resp.Body.Close()

	if resp.StatusCode != http.StatusCreated {
		return nil, fmt.Errorf("unexpected status code: %d", resp.StatusCode)
	}

	var derviceResponse DeviceResponse

	if err := json.NewDecoder(resp.Body).Decode(&derviceResponse); err != nil {
		return nil, fmt.Errorf("error decoding device response: %w", err)
	}

	return &derviceResponse, nil
}

// Метод обновления устройства
func (s *DevicesService) Update(id string, data models.SensorUpdate) (*DeviceUpdateResponse, error) {
	url := fmt.Sprintf("%s/devices/%s", s.BaseURL, id)

	jsonData, err := json.Marshal(data)

	if err != nil {
		return nil, fmt.Errorf("ошибка при преобразовании данных %w в формат JSON", err)
	}

	req, err := http.NewRequest(http.MethodPut, url, bytes.NewBuffer(jsonData))

	if err != nil {
		return nil, fmt.Errorf("ошибка при формировании запроса на обновление %w", err)
	}

	// Устанавливаем заголовок Content-Type
	req.Header.Set("Content-Type", "application/json")

	resp, err := s.HTTPClient.Do(req)

	if err != nil {
		return nil, fmt.Errorf("ошибка обновления устройства: %w", err)
	}

	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("unexpected status code: %d", resp.StatusCode)
	}

	var derviceResponse DeviceUpdateResponse

	if err := json.NewDecoder(resp.Body).Decode(&derviceResponse); err != nil {
		return nil, fmt.Errorf("error decoding device response: %w", err)
	}

	return &derviceResponse, nil
}

// Метод удаления устройства
func (s *DevicesService) Delete(id string) error {
	url := fmt.Sprintf("%s/devices/%s", s.BaseURL, id)

	req, err := http.NewRequest(http.MethodDelete, url, nil)

	if err != nil {
		return fmt.Errorf("произошла проблема при формировании запроса на удаление устройства: %w", err)
	}

	resp, err := s.HTTPClient.Do(req)

	if err != nil {
		return fmt.Errorf("произошла ошибка при удалении устройства: %w", err)
	}

	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("некорректный статус ответа: %d", resp.StatusCode)
	}

	return nil
}
