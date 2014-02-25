# Script to generate data for which_targets_clicked
from random import choice

num_of_clicks = 1000

targets = ['screen_1','screen_2','screen_3',
           'screen_4','screen_5','screen_6',
           'screen_7','screen_8','register_btn',
           'text_me_btn','learn_more_btn','help_btn','untracked_element']

clicks_file = "clicks.log"


with open(clicks_file,'w') as click_file:
   
   for x in range(num_of_clicks):
      target = choice(targets)
      click_file.write(target+'\n')
      #print 'target clicked:' + target


