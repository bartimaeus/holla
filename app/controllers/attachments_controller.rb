class AttachmentsController < ApplicationController
  def show
    @attachment = Attachment.find(params[:id])
    send_file @attachment.path
  end
  
  def create
    @attachment = Attachment.create(params[:file])
    render :json => {:url => show_attachment_url(@attachment)}
  end  
end
