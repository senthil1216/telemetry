# Script to generate data for which_targets_clicked
from random import choice,randint

def increment_time(time_stamp):

   inc = randint(100,9999)
   return time_stamp + inc


num_of_page_changes = 30

targets=  [ 'register_btn',
           'text_me_btn','learn_more_btn','help_btn','untracked_element']

screens= ['screen_1','screen_2','screen_3',
           'screen_4','screen_5','screen_6',
           'screen_7','screen_8']

clicks_file = "click_stream.log"
start_time = 1320359867352

time_stamp = start_time

with open(clicks_file,'w') as click_file:
   
   for x in range(num_of_page_changes):
      
      screen= choice(screens)

      screen_line = screen + " " + str(time_stamp)
      click_file.write(screen_line+'\n')

      for y in range(0,randint(1,5)):
         time_stamp = increment_time(time_stamp)
         target_line = choice(targets) + " " + str(time_stamp)
         click_file.write(target_line+'\n')



