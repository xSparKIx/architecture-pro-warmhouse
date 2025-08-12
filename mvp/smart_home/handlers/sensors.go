package handlers

import (
	"fmt"
	"log"
	"net/http"

	"smarthome/models"
	"smarthome/services"

	"github.com/gin-gonic/gin"
)

// SensorHandler handles sensor-related requests
type SensorHandler struct {
	TemperatureService *services.TemperatureService
	DevicesService     *services.DevicesService
}

// NewSensorHandler creates a new SensorHandler
func NewSensorHandler(temperatureService *services.TemperatureService, devicesService *services.DevicesService) *SensorHandler {
	return &SensorHandler{
		TemperatureService: temperatureService,
		DevicesService:     devicesService,
	}
}

// RegisterRoutes registers the sensor routes
func (h *SensorHandler) RegisterRoutes(router *gin.RouterGroup) {
	sensors := router.Group("/sensors")
	{
		sensors.GET("", h.GetSensors)
		sensors.GET("/:id", h.GetSensorByID)
		sensors.POST("", h.CreateSensor)
		sensors.PUT("/:id", h.UpdateSensor)
		sensors.DELETE("/:id", h.DeleteSensor)
		sensors.PATCH("/:id/value", h.UpdateSensorValue)
		sensors.GET("/temperature/:location", h.GetTemperatureByLocation)
	}
}

// GetSensors handles GET /api/v1/sensors
func (h *SensorHandler) GetSensors(c *gin.Context) {
	devices, err := h.DevicesService.GetDevices()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	var result []models.Sensor

	// Update temperature sensors with real-time data from the external API
	for _, device := range *devices {
		tempData, err := h.TemperatureService.UpdateByDeviceId(device.Id)

		if err == nil {
			// Update sensor with real-time data
			result = append(result, models.Sensor{
				ID:           device.Id,
				Name:         device.Name,
				Description:  device.Description,
				SerialNumber: device.SerialNumber,
				Data:         tempData.Data,
				Status:       device.Status,
				LastUpdated:  device.UpdatedAt,
				CreatedAt:    device.CreatedAt,
			})
			log.Printf("Updated temperature data for sensor %d from external API", device.Id)
		} else {
			log.Printf("Failed to fetch temperature data for sensor %d: %v", device.Id, err)
		}
	}

	c.JSON(http.StatusOK, result)
}

// GetSensorByID handles GET /api/v1/sensors/:id
func (h *SensorHandler) GetSensorByID(c *gin.Context) {
	id := c.Param("id")

	device, err := h.DevicesService.GetDeviceById(id)

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Sensor not found"})
		return
	}

	// If this is a temperature sensor, fetch real-time data from the temperature API
	tempData, err := h.TemperatureService.UpdateByDeviceId(device.Id)

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Телеметрия не найдена"})
		return
	}

	c.JSON(http.StatusOK, models.Sensor{
		ID:           device.Id,
		Name:         device.Name,
		Description:  device.Description,
		SerialNumber: device.SerialNumber,
		Data:         tempData.Data,
		Status:       device.Status,
		LastUpdated:  device.UpdatedAt,
		CreatedAt:    device.CreatedAt,
	})
}

// GetTemperatureByLocation handles GET /api/v1/sensors/temperature/:location
func (h *SensorHandler) GetTemperatureByLocation(c *gin.Context) {
	location := c.Param("location")

	if location == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Location is required"})
		return
	}

	// Эмитируем получение устройств из сервиса управления локациями
	// В рабочем варианте мы обращаемся к микросервису управления локациями и получаем от туда все устройства,
	// связанные с локацией
	devices, err := h.DevicesService.GetDevices()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": fmt.Sprintf("При получении устройств переданной локации произошла ошибка: %v", err),
		})
		return
	}

	var devicesIds []string

	for _, device := range *devices {
		devicesIds = append(devicesIds, device.Id)
	}

	tempData, err := h.TemperatureService.GetByDeviceIds(services.TelemetryGetParams{Id: devicesIds})

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": fmt.Sprintf("Failed to fetch temperature data: %v", err),
		})
		return
	}

	// Return the temperature data
	c.JSON(http.StatusOK, tempData)
}

// CreateSensor handles POST /api/v1/sensors
func (h *SensorHandler) CreateSensor(c *gin.Context) {
	var sensorCreate models.SensorCreate

	if err := c.ShouldBindJSON(&sensorCreate); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	sensor, err := h.DevicesService.Create(sensorCreate)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, sensor)
}

// UpdateSensor handles PUT /api/v1/sensors/:id
func (h *SensorHandler) UpdateSensor(c *gin.Context) {
	id := c.Param("id")

	var sensorUpdate models.SensorUpdate

	if err := c.ShouldBindJSON(&sensorUpdate); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	sensor, err := h.DevicesService.Update(id, sensorUpdate)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, sensor)
}

// DeleteSensor handles DELETE /api/v1/sensors/:id
func (h *SensorHandler) DeleteSensor(c *gin.Context) {
	id := c.Param("id")

	err := h.DevicesService.Delete(id)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Sensor deleted successfully"})
}

// UpdateSensorValue handles PATCH /api/v1/sensors/:id/value
func (h *SensorHandler) UpdateSensorValue(c *gin.Context) {
	id := c.Param("id")

	telemery, err := h.TemperatureService.UpdateByDeviceId(id)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, telemery)
}
