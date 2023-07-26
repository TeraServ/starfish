package com.teranet.teralearning.service;

import com.teranet.teralearning.model.SoftDelete;
import com.teranet.teralearning.model.Stream;
import com.teranet.teralearning.model.User;
import com.teranet.teralearning.repository.DeletedRecordsRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;

@Service
@Slf4j
@AllArgsConstructor
@NoArgsConstructor
public class DeletedRecordsService implements DeletedRecordsInterface {
    @Autowired
    private DeletedRecordsRepository deletedRecordsRepository;
    @Autowired
    @Lazy
    private UserService userService;




    @Override
    public void deleteUserBody(User user){
        try {
            SoftDelete deleteRecord  = deletedRecordsRepository.findByRecordId(user.getId());
                if (deleteRecord == null) {
                    log.info("DeletedRecordsService:deleteUserBody Init...");
                    SoftDelete softDelete = new SoftDelete();
                    softDelete.setRecordId(user.getId());
                    softDelete.setType(user.getClass().getSimpleName());
                    softDelete.setDeletionDate(getDate());
                    deletedRecordsRepository.save(softDelete);
                } else {
                    log.info("DeletedRecordsService:deleteUserBody User already suspended where email:"+user.getEmail());
                }
        }catch (Exception ex) {
            log.info("DeletedRecordsService:deleteUserBody Exception occurred:"+ex);

        }

    }
    @Override
    public void deleteStreamBody(Stream stream){
        try{
            SoftDelete deleteRecord  = deletedRecordsRepository.findByRecordId(stream.getId());
            if(deleteRecord == null){
            log.info("DeletedRecordsService:deleteStreamBody Init...");
            SoftDelete softDelete = new SoftDelete();
            softDelete.setRecordId(stream.getId());
            softDelete.setType(stream.getClass().getSimpleName());
            softDelete.setDeletionDate(getDate());
            deletedRecordsRepository.save(softDelete);}
            else {
                log.info("DeletedRecordsService:deleteStreamBody Stream already suspended where Stream Name:"+stream.getStreamName());
            }

        }
        catch (Exception ex){
            log.error("DeletedRecordsService:deleteStreamBody Exception occurred:"+ex);
        }
    }

    @Override
    public void checkDeletionDate(String type, long recordId){
        try{
            log.info("DeletedRecordsService:checkDeletionDate Init...");
            SoftDelete deleteRecord  = deletedRecordsRepository.findByRecordId(recordId);
            if( deleteRecord == null) {
                if (type!=null) {
                    log.info("DeletedRecordsService:checkDeletionDate Record not found with id:" + recordId);
                }
                else {
                    log.info("DeletedRecordsService:checkDeletionDate Invalid-Record not found with id:" + recordId);
                }
            }
            else{
                log.info("DeletedRecordsService:checkDeletionDate Record found with id:"+recordId);
                if(deleteRecord.getType().equals(type)){
                    if(checkRecordExpiration(deleteRecord)){
                        log.info("DeletedRecordsService:checkDeletionDate Record found with expiration period elapsed");
                        permanentlyDeleteRecord(deleteRecord.getId(), recordId);
                    }
                    else {
                        log.info("DeletedRecordsService:checkDeletionDate Record found is within the expiration period");
                    }
                }
            }
        }
        catch (Exception ex){
            log.error("DeletedRecordsService: Exception occurred:"+ex);
        }
    }
    @Override
    public boolean checkRecordExpiration(SoftDelete softDelete){
        log.info("DeletedRecordsService:checkRecordExpiration Checking expiration for record:"+softDelete.getRecordId());
        int suspendedDays = 10;
        Period period = Period.between(softDelete.getDeletionDate(), getDate());
        boolean isExpired = period.getYears()>=1 || period.getMonths()>=1 || period.getDays() >= suspendedDays;
        return isExpired ? true : false;
    }
    private void permanentlyDeleteRecord(long id,long recordID){
        try {
            if(id == 0){
                log.error("DeletedRecordsService:permanentlyDeleteRecord No such Record Id");
            }
            else{
                log.info("DeletedRecordsService:permanentlyDeleteRecord Init...");
                deletedRecordsRepository.deleteById(id);
                userService.accessDeleteMethod(recordID);
                log.info("DeletedRecordsService:permanentlyDeleteRecord > UserService:");
                log.info("DeletedRecordsService:permanentlyDeleteRecord Record deleted:"+id);
            }
        }
        catch (Exception ex){
            log.error("DeletedRecordsService:permanentlyDeleteRecord Exception Occurred:"+ex);

        }
    }
    @Override
    public void  clearDeletionRecord(String type, long recordId){
        try{
                log.info("DeletedRecordsService:clearDeleteAction Init...");
                SoftDelete clearRecord  = deletedRecordsRepository.findByRecordId(recordId);
                if( clearRecord == null) {
                    log.error("DeletedRecordsService:clearDeleteAction Record not found in deleted records");
                }
                else {
                    if(clearRecord.getType().equals(type)){
                        deletedRecordsRepository.deleteById(clearRecord.getId());
                        log.info("DeletedRecordsService:clearDeleteAction Deletion-Record removed for User id:"+clearRecord.getRecordId());
                    }
                    else{
                        log.error("DeletedRecordsService:clearDeleteAction Invalid-Record not found in deleted records");
                    }
                }
        }
        catch (Exception ex){
            log.error("DeletedRecordsService:clearDeleteAction Exception Occurred:"+ex);
        }
    }

    public LocalDate getDate(){
        return LocalDate.now();
    }
}
