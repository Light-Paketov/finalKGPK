from django import forms

class EstimationForm(forms.Form):
    rating = forms.IntegerField()
    comment = forms.CharField(widget=forms.Textarea)
    task_id = forms.IntegerField(widget=forms.HiddenInput())
