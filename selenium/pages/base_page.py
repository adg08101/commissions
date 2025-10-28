from selenium.webdriver.common.by import By


class BasePage:
    def __init__(self, driver):
        self.driver = driver

    def click(self, by, value):
        self.driver.find_element(by, value).click()

    def type(self, by, value, text):
        self.driver.find_element(by, value).send_keys(text)
