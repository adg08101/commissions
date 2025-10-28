from selenium.webdriver.common.by import By
from pages.base_page import BasePage


class LoginPage(BasePage):
    USERNAME_INPUT = (By.NAME, "email")
    PASSWORD_INPUT = (By.NAME, "password")
    LOGIN_BUTTON = (By.TAG_NAME, "button")

    def login(self, username, password):
        self.type(*self.USERNAME_INPUT, username)
        self.type(*self.PASSWORD_INPUT, password)
        self.click(*self.LOGIN_BUTTON)
