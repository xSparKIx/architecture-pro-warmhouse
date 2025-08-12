package models

import (
	"time"
)

// @todo Может в сервисы добавить тип
// SensorType represents the type of sensor
type SensorType string

const (
	Temperature SensorType = "temperature"
)

// Sensor represents a smart home sensor
type Sensor struct {
	ID           string    `json:"id"`
	Name         string    `json:"name"`
	Description  string    `json:"description"`
	SerialNumber string    `json:"serial_number"`
	Data         any       `json:"data"`
	Status       string    `json:"status"`
	LastUpdated  time.Time `json:"last_updated"`
	CreatedAt    time.Time `json:"created_at"`
}

// SensorCreate represents the data needed to create a new sensor
type SensorCreate struct {
	Name         string `json:"name" binding:"required"`
	Description  string `json:"description" binding:"required"`
	SerialNumber string `json:"serial_number" binding:"required"`
	Status       string `json:"status"`
}

// SensorUpdate represents the data that can be updated for a sensor
type SensorUpdate struct {
	Name         string `json:"name"`
	Description  string `json:"description"`
	SerialNumber string `json:"serial_number"`
	Status       string `json:"status"`
}
