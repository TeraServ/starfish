package com.teranet.teralearning.service;

import com.teranet.teralearning.model.SoftDelete;
import com.teranet.teralearning.model.Stream;
import com.teranet.teralearning.model.User;

public interface DeletedRecordsInterface {
    public void deleteUserBody(User user);
    public void deleteStreamBody(Stream stream);
    public void checkDeletionDate(String type, long recordId);
    public boolean checkRecordExpiration(SoftDelete softDelete);
}
