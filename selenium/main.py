import os
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
import time
from dotenv import load_dotenv

load_dotenv()
driver_path = os.path.join(os.path.dirname(__file__), "drivers", "chromedriver.exe")


# Access variables
login_url = os.getenv("LOGIN_URL")

service = Service(executable_path=os.path.abspath(driver_path))

driver = webdriver.Chrome(service=service)
driver.get(login_url)

time.sleep(5)
driver.quit()
