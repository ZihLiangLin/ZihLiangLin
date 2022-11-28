from selenium import webdriver
import time
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver = webdriver.Chrome()
driver.get("https://www.railway.gov.tw/tra-tip-web/tip/tip001/tip121/query") # 到登入頁面

#region 臺中-高雄

#region 塞值
driver.find_element(By.ID,'pid').send_keys('A123456789')
driver.find_element(By.ID,'startStation').send_keys('3300-臺中')
driver.find_element(By.ID,'endStation').send_keys('4400-高雄')
normalQty = driver.find_element(By.ID,'normalQty')
normalQty.clear()
normalQty.send_keys('2')
driver.find_element(By.ID,'rideDate1').send_keys('2022/12/31')
driver.find_element(By.ID,'trainNoList1').send_keys('115')

time.sleep(1)
WebDriverWait(driver, 20).until(EC.frame_to_be_available_and_switch_to_it((By.CSS_SELECTOR,"iframe[title='reCAPTCHA']")))
WebDriverWait(driver, 20).until(EC.element_to_be_clickable((By.CSS_SELECTOR, "div.recaptcha-checkbox-border"))).click()

# switch back to the main document
# 不切換回來，就困在iframe
driver.switch_to.default_content()
#endregion

submit = driver.find_element(By.XPATH, ("//input[@class='btn btn-3d']"))
print(bool(submit))
if submit:
    submit.click()
    submit.click()
else:
    WebDriverWait(driver, 20).until(EC.frame_to_be_available_and_switch_to_it((By.CSS_SELECTOR,"iframe[title='reCAPTCHA']")))
#endregion

driver.back()
driver.refresh()

#region 高雄-中壢
driver.find_element(By.ID,'pid').send_keys('A123456789')
driver.find_element(By.ID,'startStation').send_keys('4400-高雄')
driver.find_element(By.ID,'endStation').send_keys('1100-中壢')
normalQty = driver.find_element(By.ID,'normalQty')
normalQty.clear()
normalQty.send_keys('2')
driver.find_element(By.ID,'rideDate1').send_keys('2023/01/02')
driver.find_element(By.ID,'trainNoList1').send_keys('115')
time.sleep(1)
WebDriverWait(driver, 20).until(EC.frame_to_be_available_and_switch_to_it((By.CSS_SELECTOR,"iframe[title='reCAPTCHA']")))
WebDriverWait(driver, 20).until(EC.element_to_be_clickable((By.CSS_SELECTOR, "div.recaptcha-checkbox-border"))).click()
driver.switch_to.default_content()
driver.find_element(By.XPATH, ("//input[@class='btn btn-3d']")).click()
driver.find_element(By.XPATH, ("//input[@class='btn btn-3d']")).click()
#endregion


time.sleep(20)