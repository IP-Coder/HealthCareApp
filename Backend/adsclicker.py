import string
import random
import pyautogui as pt
import time
import selenium
time.sleep(5)
# driver_len = len(driver.window_handles)  # fetching the Number of Opened tabs
# print("Length of Driver = ", driver_len)
# for i in range(10):


def generate_random_string(length):
    # Generate a random string of the specified length
    letters = string.ascii_letters + string.digits
    return ''.join(random.choices(letters, k=length))


# print()
while (True):
    # pt.scroll(-10000)
    # pt.click()
    # time.sleep(10)
    # pt.hotkey('alt', 'left')
    # pt.hotkey('ctrl', '1')
    # time.sleep(3)
    # pt.hotkey('browserrefresh')
    # time.sleep(3)
    # pt.scroll(-10000)
    # time.sleep(3)
    # pt.scroll(10000)
    # time.sleep(3)
    # pt.scroll(-10000)
    # time.sleep(3)
    # pt.click()
    # time.sleep(3)
    # pt.hotkey('ctrl', 'w')
    # time.sleep(3)
    strings = generate_random_string(10)
    pt.typewrite(strings)
    pt.press('enter')
