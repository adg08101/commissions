import os
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
import time
from dotenv import load_dotenv
from pages.login_page import LoginPage

load_dotenv()
driver_path = os.path.join(os.path.dirname(__file__), "drivers", "chromedriver.exe")


# Access variables
login_url = os.getenv("LOGIN_URL")
username = os.getenv("USER_NAME")
password = os.getenv("PASSWORD")

service = Service(executable_path=os.path.abspath(driver_path))

driver = webdriver.Chrome(service=service)
driver.get(login_url)

login_page = LoginPage(driver)
login_page.login(username, password)

time.sleep(5)
driver.quit()
